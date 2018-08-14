import {
  Table,
  TableRow,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableData,
  TableTitle,
  TableBody,
  Button,
  ButtonIcon
} from 'rapid7-ui';

import styled from 'styled-components';
import classnames from 'classnames';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Expandable = styled.button`
    margin-right: 5px;
    font-size: 14px;
    line-height: 20px;
    transform: rotate(180deg);
    transition: transform 0.2s ease-in-out;
    cursor: pointer;

    &.expanded {
      width: 0%;
    }
`;

class NestedTableHOC extends Component {
  state = {
    expandedRowIndex: null
  };

  onToggle = ({ currentTarget }) => {
    const rowIndex = +currentTarget.dataset.index;

    this.setState(({ expandedRowIndex }) => {
      if (rowIndex === expandedRowIndex) {
        return { expandedRowIndex: null };
      }

      return { expandedRowIndex: rowIndex };
    });
  };
  //hi

  renderRowCells = (row) => {
    const { cells } = this.props;

    return cells.map((cell, i) => {
      return (
        <TableCell key={i}>
          {cell.render(row)}
        </TableCell>
      );
    });
  };

  renderNested = () => {
    const { rows, getChildRows } = this.props;
    const { expandedRowIndex } = this.state;

    return (
      rows.map((row, rowIndex) => {
        const children = getChildRows(row);
        const hasChildren = children.length > 0;
        const expanded = rowIndex === expandedRowIndex;

        const parentRow = (
          <TableRow
            key={rowIndex}
          >
            <TableCell style={{ 'width': '10px' }}>
              {hasChildren && (
                <Expandable
                  className={`${expanded ? "expanded" : ''}`}
                  data-index={rowIndex}
                  onClick={this.onToggle}
                >
                  <ButtonIcon icon={`${expanded ? 'left-chev' : 'drop-chev'}`} />
                </Expandable>
              )}
            </TableCell>

            {this.renderRowCells(row)}
          </TableRow>
        );

        if (expanded) {
          return [
            parentRow,
            ...children.map((childRow, i) => (
              <TableRow key={`${rowIndex}-child-${i}`}>
                <TableCell />

                {this.renderRowCells(childRow)}
              </TableRow>
            ))
          ];
        }

        return parentRow;
      })
    )
  };

  render() {
    const { cells } = this.props;

    return(
        <Table>
          <TableTitle>
          </TableTitle>
          <TableData>
            <TableHead>
              <TableCell/>
              {cells.map(({ header }) => <TableCell>{header}</TableCell>)}
            </TableHead>
            <TableBody>
              {this.renderNested()}
            </TableBody>
          </TableData>
          <TableFooter/>
        </Table>
    )
  }
}

NestedTableHOC.propTypes = {
  children: PropTypes.node.isRequired,
  rows: PropTypes.array.isRequired,
  cells: PropTypes.array.isRequired,
  getChildRows: PropTypes.func.isRequired, // (parentRow) => // child rows array
  classname: PropTypes.string
};

export default NestedTableHOC;