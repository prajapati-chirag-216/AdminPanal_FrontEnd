import React, { Fragment } from "react";
import Display from "../../components/Dekstop/Display/Display";
import CardDiv from "../../components/Dekstop/UI/Card";
import Table from "../../components/Dekstop/Table/Table";
const Deshboard = () => {
  return (
    <Fragment>
      <CardDiv />
      <Display />
      <Table />
    </Fragment>
  );
};

export default Deshboard;
