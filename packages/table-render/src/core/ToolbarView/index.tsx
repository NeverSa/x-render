import React from 'react';
import { Space } from 'antd';
import classNames from 'classnames';

import { _get, isFunction, isArray } from '../../utils';
import InteriorTool from './InteriorTool';

import TitleView from './TitleView';
import './index.less';

const ToolbarView = props => {
  const { 
    setState,
    getState,
    headerTitle, 
    toolbarRender, 
    toolbarAction = false, 
    api,
    refresh,
    doSearch,
    fullScreen
  } = props;
  
  const content = isFunction(toolbarRender) ? toolbarRender() : [];
  const isTopHead = headerTitle || (!!content && content?.length !== 0) || (isArray(api) && api.length > 1);
 
  return (
    <div className={classNames('tr-toolbar', { 'tr-toolbar-nohead': !isTopHead })}>
      <div className='tr-toolbar-left'>
        <TitleView title={headerTitle} doSearch={doSearch} getState={getState} setState={setState} />
      </div>
      <div className='tr-toolbar-right'>
        <Space>
          <Space>{content}</Space>
          {toolbarAction && <InteriorTool fullScreen={fullScreen} refresh={refresh} />}
        </Space>
      </div>
    </div>
  );
}

export default ToolbarView;
