import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TextField, Button, Grid, Paper, MenuItem } from "@mui/material";
import { editEvent } from "../api/event.js";
import { format, parseISO } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

const EditEventForm = ({ event, onCancel }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: event.name || "",
      startDate: event.startDate ? format(parseISO(event.startDate), "yyyy-MM-dd'T'HH:mm") : "",
      endDate: event.endDate ? format(parseISO(event.endDate), "yyyy-MM-dd'T'HH:mm") : "",
      location: event.location || "",
      status: event.status || "",
    },
  });

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: (formData) => editEvent(event._id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries("events");
      reset();
      onCancel();
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("startDate", fromZonedTime(data.startDate, 'Asia/Kuala_Lumpur').toISOString());
    formData.append("endDate", fromZonedTime(data.endDate, 'Asia/Kuala_Lumpur').toISOString());
    formData.append("location", data.location);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("status", data.status);
    editMutation.mutate(formData);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="on"
              label="Event Name"
              {...register("name", { required: true })}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Start Date"
              type="datetime-local"
              {...register("startDate", { required: true })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Date"
              type="datetime-local"
              {...register("endDate", { required: true })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              {...register("location", { required: true })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" {...register("thumbnail")} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Status"
              defaultValue={event.status}
              {...register("status", { required: true })}
              fullWidth
            >
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditEventForm;
