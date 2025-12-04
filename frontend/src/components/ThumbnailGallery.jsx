import React, { useEffect, useRef, useState } from "react";
import { Card, CardMedia, Grid, Skeleton } from "@mui/material";

export default function ThumbnailGallery({ files, onSelect }) {
  const [visibleCount, setVisibleCount] = useState(20);
  const loadRef = useRef();

  useEffect(() => {
    setVisibleCount(20);
  }, [files]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) setVisibleCount(v => v + 20);
      }
      , { threshold: 1 }
    );

    if (loadRef.current) observer.observe(loadRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ overflowY: "auto", height: "185px", padding: "5px", marginTop: "35px" }}>
      <Grid container spacing={1}>
        {files.slice(0, visibleCount).map(file => (
          <Grid item xs={6} sm={3} md={1.2} key={file.fileName}>
            <Card onClick={() => onSelect(file)} sx={{ cursor: "pointer" }}>
              {file.thumbnail ? (
                <CardMedia component="img" height="90" image={file.thumbnail} />
              ) : (
                <Skeleton variant="rectangular" height={120} />
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <div ref={loadRef} style={{ height: "20px" }} />
    </div>
  );
}