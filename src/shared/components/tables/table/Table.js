/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import empty from '../../../../assets/empty.png';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  Row,
  Table,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import { Colxx } from '../../common/rBootstrap';
import DatatablePagination from './DataTablePagination';
import '../datatables.scss';
import '../table.scss';

function RTable({
  columns,
  data,
  divided = false,
  defaultPageSize = 30,
  hover = true,
  responsive = true,
  searchButtonOutline = true,
  showPageSizeOptions = true,
  showPageJump = false,
  hasActionMenu = true,
  onDelete,
  onView,
  onEdit,
  onViewMore,
  onSearch,
  showSearch = false,
  showEdit = false,
  showDelete = false,
  showView = true,
  pagination = true,
  idAccessor = 'id',

  pageCount: controlledPageCount,
  fetchData,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: false,
    },
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const [keyword, setKeyword] = useState('');

  const handleSearch = async e => {
    onSearch(keyword);
  };

  const handleChangeSearch = async e => {
    setKeyword(e.target.value);
  };

  return (
    <>
      {showSearch && (
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <InputGroup className="mb-3">
              <Input
                placeholder="...Search..."
                style={{ fontSize: '14px' }}
                onChange={handleChangeSearch}
              />
              <InputGroupAddon addonType="append">
                <Button outline={searchButtonOutline} color="primary" onClick={handleSearch}>
                  <i className="uil-search"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      )}
      {data.length > 0 ? (
        <>
          <Table
            {...getTableProps()}
            className={`new r-table table ${classnames({
              'table-divided': divided,
            })}`}
            responsive={responsive}
            hover={hover}
            striped
          >
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      key={`th_${columnIndex}`}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                        column.isSorted ? (column.isSortedDesc ? 'sorted-desc' : 'sorted-asc') : ''
                      }
                    >
                      {column.render('label')}
                      <span />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    onClick={() => !hasActionMenu && onView(data[rowIndex])}
                    style={{ cursor: 'pointer' }}
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={`td_${cellIndex}`}
                        id={'action' + cellIndex}
                        {...cell.getCellProps({
                          className: cell.column.cellClass,
                        })}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                    {hasActionMenu && (
                      <td>
                        <UncontrolledButtonDropdown
                          size="xs"
                          //isOpen={false}
                          //toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
                        >
                          <div className="btn btn-primary btn-lg pl-4 pr-0">Action</div>
                          <DropdownToggle
                            size="xs"
                            caret
                            color="primary"
                            className="dropdown-toggle-split btn-lg"
                          />
                          <DropdownMenu right>
                            {showView && (
                              <DropdownItem onClick={() => onView(data[rowIndex])}>
                                View
                              </DropdownItem>
                            )}
                            {showEdit && (
                              <DropdownItem onClick={() => onEdit(data[rowIndex])}>
                                Edit
                              </DropdownItem>
                            )}
                            {showDelete && (
                              <DropdownItem onClick={() => onDelete(data[rowIndex])}>
                                Delete
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </UncontrolledButtonDropdown>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {pagination && (
            <DatatablePagination
              page={pageIndex}
              pages={pageCount}
              canPrevious={canPreviousPage}
              canNext={canNextPage}
              pageSizeOptions={[10, 20, 30, 40, 50]}
              showPageSizeOptions={showPageSizeOptions}
              showPageJump={showPageJump}
              defaultPageSize={pageSize}
              onPageChange={p => gotoPage(p)}
              onPageSizeChange={s => setPageSize(s)}
              paginationMaxSize={pageCount}
            />
          )}
          {!pagination && (
            <Row>
              <Colxx xxs="12">
                <Button
                  color="primary"
                  size="s"
                  className="mb-2"
                  onClick={() => {
                    if (onViewMore != null) onViewMore();
                  }}
                >
                  View More Transactions
                </Button>
              </Colxx>
            </Row>
          )}
        </>
      ) : (
        <>
          <div className="text-center">
            <img src={empty} style={{ width: '30%', height: '30%' }} />
            <h2>Nothing to show</h2>
          </div>
        </>
      )}
    </>
  );
}

export default RTable;
