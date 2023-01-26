import { useState, MouseEvent, useId } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'lodash';
import { Box } from '@mui/material';
import RecipeModal from '../RecipeModal/RecipeModal';
import { Recipe } from '../../store/recipe/interfaces/recipe.interface';

export interface ColumnTable {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any) => string;
}
interface PaginationTableProps {
  itemsArray: Recipe[];
  columns: ColumnTable[];
  emptyMessage: string;
}
export default function PaginationTableModal({
  itemsArray,
  columns,
  emptyMessage,
}: PaginationTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState<Recipe | undefined>(
    undefined
  );
  const [openModal, setOpenModal] = useState(false);
  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    newPage: number
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };
  const handleSetSelectedItem = (e: MouseEvent, item: Recipe) => {
    setSelectedItem(item);
    setOpenModal(true);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columnId = useId();
  const itemId = useId();
  return (
    <>
      {selectedItem && (
        <RecipeModal
          recipe={selectedItem}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
      <Paper
        sx={{
          width: '100%',
          marginTop: 3,
        }}
      >
        {itemsArray.length ? (
          <>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell
                        key={`${columnId}-${index}-${column.id}`}
                        sx={{ minWidth: '100px' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemsArray
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return (
                        <TableRow
                          hover
                          role="button"
                          tabIndex={-1}
                          key={`${itemId}-${index}`}
                          onClick={(e) => handleSetSelectedItem(e, item)}
                        >
                          {columns.map((column) => {
                            const value = _.get(item, column.id);
                            return (
                              <TableCell
                                key={`${itemId}-${column.id}-${index}`}
                              >
                                {column.format ? column.format(value) : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={itemsArray.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {emptyMessage}
          </Box>
        )}
      </Paper>
    </>
  );
}
