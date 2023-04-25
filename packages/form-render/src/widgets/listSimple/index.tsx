import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Space } from 'antd';
import classnames from 'classnames';
import React from 'react';
import FButton from '../components/FButton';
import './index.less';

const getHasBackground = (fields: any[], hasBackground: boolean) => {
  let result = hasBackground;
  if (fields.length === 0) {
    result = false;
  }
  return result;
};

const SimpleList = (props: any) => {
  const {
    form,
    schema,
    fields,
    rootPath,
    renderCore,
    hasBackground,
    operateBtnType,
    addBtnProps,
    delConfirmProps,
    copyBtnProps,
    deleteBtnProps,
    moveUpBtnProps,
    moveDownBtnProps,

    hideDelete,
    hideCopy,
    hideMove,
    hideAdd,

    addItem,
    copyItem,
    moveItem,
    removeItem,
    temporary,
  } = props;
  if (!schema.items.displayType) {
    schema.items.displayType = 'inline';
    schema.items.inlineMode = true;
  }
  //设备类型
  const { devicetype = 'pc' } = props.configContext.globalProps;
  const handleCopy = (name: number) => {
    const value = form.getFieldValue(rootPath.concat(name));
    copyItem(value);
  };
  const isColumm = temporary.displayType === 'column';
  if (devicetype == 'pc') {
    return (
      <div
        className={classnames('fr-list-simple', {
          'fr-list-simple-background': getHasBackground(fields, hasBackground),
          'fr-list-simple-column': isColumm,
        })}
      >
        {fields.map(({ key, name }) => {
          const length = fields.length;
          return (
            <div key={key} className="fr-list-item">
              {renderCore({
                schema,
                parentPath: [name],
                rootPath: [...rootPath, name],
              })}
              <Space
                className={classnames('fr-list-item-operate')}
                split={operateBtnType !== 'icon' && <Divider type="vertical" />}
              >
                {!hideDelete && (
                  <Popconfirm
                    onConfirm={() => removeItem(name)}
                    {...delConfirmProps}
                  >
                    <FButton
                      icon={<CloseOutlined />}
                      children="删除"
                      btnType={operateBtnType}
                      {...deleteBtnProps}
                    />
                  </Popconfirm>
                )}
              </Space>
            </div>
          );
        })}
        {(!schema.max || fields.length < schema.max) && !hideAdd && (
          <Button
            className="add-btn"
            icon={<PlusOutlined />}
            onClick={() => addItem()}
            block={fields.length > 0 ? true : false}
            {...addBtnProps}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="fr-list-simple-mobile">
        {fields.map(({ key, name }, index) => {
          const length = fields.length;
          return (
            <div key={key} className="fr-list-item">
              <div className="fr-list-item-title">
                <span>
                  {' '}
                  {schema.title}({index + 1})
                </span>
                <FButton
                  onClick={() => {
                    removeItem(name);
                  }}
                  children="删除"
                  btnType={operateBtnType}
                  {...deleteBtnProps}
                />
              </div>
              {renderCore({
                schema,
                parentPath: [name],
                rootPath: [...rootPath, name],
              })}
            </div>
          );
        })}
        {(!schema.max || fields.length < schema.max) && !hideAdd && (
          <a
            className="list-simple-mobile-add"
            onClick={() => addItem()}
            block={fields.length > 0 ? true : false}
            {...addBtnProps}
          >
            添加{schema.title}
          </a>
        )}
      </div>
    );
  }
};

export default SimpleList;
