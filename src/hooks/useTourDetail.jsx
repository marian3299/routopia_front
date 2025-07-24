import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getDestinationDetail } from "../redux/routopiaActions";

const useTourDetail = () => {
  const { destination, fetching_destination } = useAppSelector(
    (state) => state.routopiaStore
  );
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDestinationDetail(id));
  }, [id]);

  return { destination, fetching_destination };
};

export default useTourDetail;
