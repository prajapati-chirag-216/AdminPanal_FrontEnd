import { Fragment } from "react";
import SimpleModal from "../Dekstop/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import AddAdminForm from "./Form/AddAdminForm";
import AddIcon from "@mui/icons-material/Add";
import StatusButton from "../Dekstop/StatusButton/StatusButton";
import "./AddAdmin.styles.scss";
import { uiActions } from "../../store/ui-slice";
import { Typography } from "@mui/material";
import AdminTable from "./AdminTable/AdminTable";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const fetchAdminData = useSelector((state) => state.admin.fetchAdminData);
  const showModel = useSelector((state) => state.ui.addModelState);

  const handleAddChange = () => {
    dispatch(uiActions.setAddModelState(true));
  };
  const closeModelHandler = () => {
    dispatch(uiActions.setAddModelState(false));
  };

  return (
    <Fragment>
      {showModel && (
        <SimpleModal onOpen={showModel} onClose={closeModelHandler}>
          <AddAdminForm action="add" />
        </SimpleModal>
      )}
      <StatusButton
        isLoading={fetchAdminData}
        icon={<AddIcon />}
        onClick={handleAddChange}
      >
        {fetchAdminData.status ? fetchAdminData.activity : "Add Admin"}
      </StatusButton>
      <Typography
        align="center"
        sx={{
          letterSpacing: "1px",
          alignSelf: "center",
          position: "fixed",
          fontSize: "1.6rem",
          marginTop: "0.5rem",
          color: "rgb(80,80,80)",
          width: "13rem",
          textTransform: "uppercase",
          borderBottom: "1px solid rgb(80,80,80)",
        }}
      >
        Admins
      </Typography>
      <AdminTable />
    </Fragment>
  );
};

export default AddAdmin;
