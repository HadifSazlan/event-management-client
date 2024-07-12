import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEvent, fetchEvents } from "../api/event.js";
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
import EditEventForm from "./editEventForm.js";
import { useState } from "react";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const EventTable = () => {
  const queryClient = useQueryClient();

  const [editingEvent, setEditingEvent] = useState(null);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
  });

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleCancel = () => {
    setEditingEvent(null);
  };

  const handleDelete = (eventId) => {
    deleteMutation.mutate(eventId);
  };

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <>
      {editingEvent ? (
        <EditEventForm event={editingEvent} onCancel={handleCancel} />
      ) : (
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
              {data.map((event) => {
                const startDate = toZonedTime(event.startDate, 'Asia/Kuala_Lumpur');
                const endDate = toZonedTime(event.endDate, 'Asia/Kuala_Lumpur');
                return (
                  <TableRow key={event._id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell align="right">
                      {format(startDate, "yyyy-MM-dd HH:mm")}
                    </TableCell>
                    <TableCell align="right">
                      {format(endDate, "yyyy-MM-dd HH:mm")}
                    </TableCell>
                    <TableCell align="right">{event.location}</TableCell>
                    <TableCell align="right">{event.status}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="center" gap={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(event)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(event._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default EventTable;
