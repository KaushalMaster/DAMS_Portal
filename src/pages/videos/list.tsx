// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { useList } from "@refinedev/core";
// import { useDataGrid } from "@refinedev/mui";
// import React, { useState, useEffect, useRef } from "react";
// import ReactPlayer from "react-player";

// export const ListVideos = () => {
//   const { dataGridProps } = useDataGrid<IVideos>({
//     sorters: { initial: [{ field: "id", order: "asc" }] },
//     syncWithLocation: true, // sync with the latest state.
//   });

//   const { data, isLoading } = useList<IVideos>({ resource: "videos" });
//   const [playingUrl, setPlayingUrl] = useState<string | null>(null);
//   const [timestamps, setTimestamps] = useState<number[]>([]);
//   const playerRef = useRef<ReactPlayer | null>(null);

//   useEffect(() => {
//     if (playingUrl) {
//       fetchVideoDuration();
//     }
//   }, [playingUrl]);

//   const fetchVideoDuration = () => {
//     const video = document.createElement("video");
//     video.src = playingUrl!;
//     video.onloadedmetadata = () => {
//       const duration = video.duration;
//       const calculatedTimestamps: number[] = [];
//       for (let i = 0; i <= duration; i += 300) {
//         // 300 seconds = 5 minutes
//         calculatedTimestamps.push(i);
//       }
//       setTimestamps(calculatedTimestamps);
//     };
//   };

//   const handleVideoReady = (player: ReactPlayer | null) => {
//     playerRef.current = player;
//   };

//   const jumpToTimestamp = (timestamp: number) => {
//     if (playerRef.current) {
//       playerRef.current.seekTo(timestamp, "seconds");
//     }
//   };

//   const handleClose = (event: React.MouseEvent) => {
//     if (event.target === event.currentTarget) {
//       setPlayingUrl(null);
//       setTimestamps([]);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const columns: GridColDef<IVideos>[] = [
//     {
//       field: "id",
//       headerName: "ID",
//       type: "number",
//       width: 50,
//     },
//     {
//       field: "title",
//       headerName: "Title",
//       minWidth: 400,
//       flex: 1,
//     },
//     {
//       field: "url",
//       headerName: "Video",
//       renderCell: (params) => (
//         <button onClick={() => setPlayingUrl(params.value)}>Play Video</button>
//       ),
//       width: 150,
//     },
//   ];

//   return (
//     <div>
//       <DataGrid
//         {...dataGridProps}
//         rows={data.data.videos}
//         columns={columns}
//         pageSize={5}
//       />
//       {playingUrl && (
//         <div style={overlayStyle} onClick={handleClose}>
//           <div style={playerWrapperStyle}>
//             <ReactPlayer
//               ref={handleVideoReady}
//               url={playingUrl}
//               controls
//               playing
//               width="100%"
//               height="100%"
//               config={{
//                 file: {
//                   attributes: {
//                     onContextMenu: (e: Event) => e.preventDefault(),
//                   },
//                 },
//               }}
//             />
//             <div style={timestampContainerStyle}>
//               {timestamps.map((timestamp, index) => (
//                 <button
//                   key={index}
//                   onClick={() => jumpToTimestamp(timestamp)}
//                   style={timestampButtonStyle}
//                 >
//                   {formatTime(timestamp)}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const formatTime = (seconds: number) => {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = Math.floor(seconds % 60);
//   return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
// };

// interface IVideos {
//   id: number;
//   title: string;
//   description: string;
//   duration: string;
//   url: string;
//   tags: string[];
// }

// const overlayStyle: React.CSSProperties = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: "rgba(0, 0, 0, 0.8)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 1000,
// };

// const playerWrapperStyle: React.CSSProperties = {
//   position: "relative",
//   width: "80%",
//   maxWidth: "800px",
//   backgroundColor: "#fff",
//   padding: "20px",
//   borderRadius: "8px",
// };

// const timestampContainerStyle: React.CSSProperties = {
//   position: "absolute",
//   bottom: "10px",
//   left: "50%",
//   transform: "translateX(-50%)",
//   display: "flex",
//   justifyContent: "center",
//   backgroundColor: "rgba(0, 0, 0, 0.6)",
//   padding: "5px",
//   borderRadius: "5px",
// };

// const timestampButtonStyle: React.CSSProperties = {
//   backgroundColor: "#CC0000",
//   color: "#FFFFFF",
//   border: "none",
//   padding: "8px 12px",
//   margin: "0 5px",
//   cursor: "pointer",
//   borderRadius: "5px",
//   outline: "none",
//   transition: "background-color 0.3s ease",
//   fontFamily: "Arial, sans-serif",
//   fontSize: "14px",
//   fontWeight: "bold",
// };

// timestampButtonStyle.hover = {
//   backgroundColor: "#FF4444",
// };

// export default ListVideos;

import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useList } from "@refinedev/core";
import { useDataGrid } from "@refinedev/mui";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Container,
  CardMedia,
  Box,
} from "@mui/material"; // Assuming MUI v5
import { Dropdown } from "../../components/dropdown/dropdown";

export const ListVideos = () => {
  const { dataGridProps } = useDataGrid<IVideos>({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true, // sync with the latest state.
  });

  const { data, isLoading } = useList<IVideos>({ resource: "videos" });
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [timestamps, setTimestamps] = useState<number[]>([]);
  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    if (playingUrl) {
      fetchVideoDuration();
    }
  }, [playingUrl]);

  const fetchVideoDuration = () => {
    const video = document.createElement("video");
    video.src = playingUrl!;
    video.onloadedmetadata = () => {
      const duration = video.duration;
      const calculatedTimestamps: number[] = [];
      for (let i = 0; i <= duration; i += 300) {
        // 300 seconds = 5 minutes
        calculatedTimestamps.push(i);
      }
      setTimestamps(calculatedTimestamps);
    };
  };

  const handleVideoReady = (player: ReactPlayer | null) => {
    playerRef.current = player;
  };

  const jumpToTimestamp = (timestamp: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(timestamp, "seconds");
    }
  };

  const handleClose = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setPlayingUrl(null);
      setTimestamps([]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)", // Added shadow style
        borderRadius: 4, // Optional rounded corners for the container
        padding: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", marginBottom: 3 }}>
        <Dropdown />
        <Dropdown />
        <Dropdown />
      </Box>

      <Grid container spacing={3}>
        {data.data.videos.map((video) => (
          <Grid item key={video.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={video.image}
                alt={video.title}
              />
              <CardContent>
                <h2>{video.title}</h2>
                <Button onClick={() => setPlayingUrl(video.url)}>
                  Play Video
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {playingUrl && (
          <div style={overlayStyle} onClick={handleClose}>
            <div style={playerWrapperStyle}>
              <ReactPlayer
                ref={handleVideoReady}
                url={playingUrl}
                controls
                playing
                width="100%"
                height="100%"
                config={{
                  file: {
                    attributes: {
                      onContextMenu: (e: Event) => e.preventDefault(),
                    },
                  },
                }}
              />
              {/* <div style={timestampContainerStyle}>
              {timestamps.map((timestamp, index) => (
                <button
                  key={index}
                  onClick={() => jumpToTimestamp(timestamp)}
                  style={timestampButtonStyle}
                >
                  {formatTime(timestamp)}
                </button>
              ))}
            </div> */}
            </div>
          </div>
        )}
      </Grid>
    </Container>
  );
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

interface IVideos {
  id: number;
  title: string;
  description: string;
  duration: string;
  url: string;
  tags: string[];
  image: string; // Added image field
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const playerWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "80%",
  maxWidth: "800px",
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
};

const timestampContainerStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: "5px",
  borderRadius: "5px",
};

const timestampButtonStyle: React.CSSProperties = {
  backgroundColor: "#CC0000",
  color: "#FFFFFF",
  border: "none",
  padding: "8px 12px",
  margin: "0 5px",
  cursor: "pointer",
  borderRadius: "5px",
  outline: "none",
  transition: "background-color 0.3s ease",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  fontWeight: "bold",
};

timestampButtonStyle.hover = {
  backgroundColor: "#FF4444",
};

export default ListVideos;
