import { Button, Grid, Paper, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createEvent } from "../api/event.js";

const CreateEventForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries("events");
      reset();
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("location", data.location);
    formData.append("thumbnail", data.thumbnail[0]);

    mutation.mutate(formData);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
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
          <Grid item xs={12} align="right">
            <Button type="submit" variant="contained" color="primary">
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateEventForm;
