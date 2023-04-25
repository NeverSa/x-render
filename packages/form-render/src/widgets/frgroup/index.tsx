import React from 'react';
import { Button, Space, Popconfirm, Divider } from 'antd';
import { PlusOutlined, CloseOutlined, ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import FButton from '../components/FButton';


const frgroup = (props: any) => {
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
    children,
    addItem,
    copyItem,
    moveItem,
    removeItem,
    temporary
  } = props;
  //设备类型
  return <div className={schema.widget}>
    {children}
  </div>;
  
}

export default frgroup;
