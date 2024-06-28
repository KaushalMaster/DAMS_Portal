import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useSelect } from "@refinedev/core";
import { List, useDataGrid, EditButton, ShowButton } from "@refinedev/mui";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ListProducts = () => {
  const { dataGridProps } = useDataGrid<IProduct>({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoClick = () => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];
    setSelectedVideo(randomVideo.url);
  };

  const {
    options: categories,
    queryResult: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
    pagination: false,
  });

  const videos: { id: number; url: string }[] = [
    { id: 1, url: "https://example.com/video1.mp4" },
    { id: 2, url: "https://example.com/video2.mp4" },
    // Add more video URLs as needed
  ];

  const columns = React.useMemo<GridColDef<IProduct>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 400,
        flex: 1,
      },
      {
        field: "category.id",
        headerName: "Category",
        minWidth: 250,
        flex: 0.5,
        type: "singleSelect",
        valueOptions: categories,
        valueFormatter: (params) => params?.value,
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }
          return categories?.find(
            (category) => category.value == row.category.id
          )?.label;
        },
      },
      {
        field: "material",
        headerName: "Material",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <div>
              <button
                onClick={handleVideoClick}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                }}
              >
                Watch Video
              </button>
            </div>
          );
        },
      },
    ],
    [categories, isLoading]
  );

  return (
    <div>
      {selectedVideo && (
        <div style={{ marginBottom: "20px" }}>
          <ReactPlayer url={selectedVideo} controls />
        </div>
      )}
      <List>
        <DataGrid {...dataGridProps} columns={columns} autoHeight />
      </List>
    </div>
  );
};

interface IProduct {
  id: number;
  name: string;
  material: string;
  price: string;
  category: ICategory;
}

interface ICategory {
  id: number;
  title: string;
}
  