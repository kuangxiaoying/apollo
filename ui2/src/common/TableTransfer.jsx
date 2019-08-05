import React, { useState } from 'react';
import { Transfer } from 'antd';
import _ from 'lodash';
import { AppTable } from './Table';
import { Link } from 'react-router-dom';
import { AppButton } from '../common/Button';
import { tableColumns } from '../utils/tableColumns';
import './TableTransfer.css';

export const TableTransfer = ({
  data,
  searchColumns,
  rightColTitles,
  leftColTitles,
  selectGroup,
  predefinedGroups,
  linkTo,
  addSearch,
  ...props
}) => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [showSearch] = useState(!!searchColumns);
  const formattedData = data.map(dataItem => ({ ...dataItem, key: dataItem.id.toString() }));
  const handleSearch = (inputValue, item) => {
    return searchColumns.map(searchCol => item[searchCol] && item[searchCol].indexOf(inputValue) !== -1).includes(true);
  };

  return (
    <div className="table-transfer">
      <Transfer
        className="transfer"
        dataSource={formattedData}
        filterOption={(inputValue, item) => handleSearch(inputValue, item)}
        showSelectAll={false}
        targetKeys={targetKeys}
        showSearch={showSearch}
        onChange={targetKeys => setTargetKeys(targetKeys)}
        {...props}
      >
        {({ direction, filteredItems, onItemSelectAll, onItemSelect, selectedKeys }) => {
          const rowSelection = {
            onSelectAll: (isSelected, allRows) => {
              const allRowsKeys = allRows && allRows.map(item => item.key);
              const currentKeysSelection = isSelected
                ? _.difference(allRowsKeys, selectedKeys)
                : _.difference(selectedKeys, allRowsKeys);
              onItemSelectAll(currentKeysSelection, isSelected);
            },
            onSelect: (item, isSelected) => onItemSelect(item.key, isSelected),
            selectedRowKeys: selectedKeys,
          };

          const handleGroupSelection = predefinedGroupId => {
            const keys = selectGroup(predefinedGroupId);
            const addedKeys = _.difference(keys, targetKeys);
            if (addedKeys.length) {
              setTargetKeys([...targetKeys, ...addedKeys]);
            } else {
              setTargetKeys(_.difference(targetKeys, keys));
            }
          };
          const columns = direction === 'left' ? tableColumns(leftColTitles) : tableColumns(rightColTitles);

          return (
            <div>
              {direction === 'left' &&
                predefinedGroups.map(({ id, name }) => (
                  <AppButton key={id} label={name} className={'table-button'} onClick={() => handleGroupSelection(id)} />
                ))}
              {direction === 'right' && (
                <div>
                  <AppButton label={'Reset'} className={'table-button'} onClick={() => setTargetKeys([])} />
                  <Link
                    to={{
                      pathname: linkTo,
                      search: `${addSearch}=${targetKeys}`,
                    }}
                  >
                    <AppButton label={'NEXT'} disabled={!targetKeys.length} className={'table-button'} />
                  </Link>
                </div>
              )}
              <AppTable
                columns={columns}
                filteredItems={filteredItems}
                rowSelection={rowSelection}
                listSelectedKeys={selectedKeys}
                onItemSelect={onItemSelect}
              />
            </div>
          );
        }}
      </Transfer>
    </div>
  );
};
