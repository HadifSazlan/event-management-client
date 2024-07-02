import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/event.js";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const EventTable = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((event) => (
            <TableRow key={event._id}>
              <TableCell>{event.name}</TableCell>
              <TableCell align="right">
                {new Date(event.startDate).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {new Date(event.endDate).toLocaleString()}
              </TableCell>
              <TableCell align="right">{event.location}</TableCell>
              <TableCell align="right">{event.status}</TableCell>
              <TableCell>
                <Box display="flex" justifyContent="center" gap={2}>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button variant="contained" color="primary">
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventTable;
