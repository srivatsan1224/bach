import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";
import ItemDetailsDisplay from "../../components/Rental/ItemDetailsDisplay";

const ItemDetailsPage: React.FC = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await apiService.get(`/item/${id}`, {
          params: { category },
        });
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [id, category]);

  if (!item) return <p className="font-custom">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 font-custom">
      <ItemDetailsDisplay item={item} />
    </div>
  );
};

export default ItemDetailsPage;
