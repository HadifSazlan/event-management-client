import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/event.js";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const EventList = () => {
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
    <Grid container spacing={2}>
      {data.map((event) => {
        const imageUrl = `${process.env.REACT_APP_API_URL}/uploads/${event.thumbnail}`;
        const startDate = toZonedTime(event.startDate, 'Asia/Kuala_Lumpur');
        const endDate = toZonedTime(event.endDate, 'Asia/Kuala_Lumpur');
        return (
          <Grid item key={event._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt={event.name}
                onError={(err) => console.error("Error loading image:", err)}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {event.name}
                </Typography>
                <Typography variant="body2">{event.location}</Typography>
                <Typography variant="body2">
                  {format(startDate, 'yyyy-MM-dd HH:mm')} - {format(endDate, 'yyyy-MM-dd HH:mm')}
                </Typography>
                <Typography variant="body2">Status: {event.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default EventList;
