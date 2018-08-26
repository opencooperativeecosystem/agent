import React from "react";
import style from "./style.css";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { LoadingMini, ErrorMini } from "../components/loading";
import orgsQuery from '../queries/getOrganizations'
import {NavigationItem} from 'oce-components/build'

const Network = ({ data }) => (
  <Query
    query={orgsQuery}
    variables={{
      token: localStorage.getItem("oce_token")
    }}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return <LoadingMini />;
      if (error)
        return (
          <ErrorMini refetch={refetch} message={`Error! ${error.message}`} />
        );
        console.log(data)
      return data.viewer.fcOrganizations.map((item, i) => (
          <Link className={style.orgLink} key={i} to={"agent/" + item.id}>
            <NavigationItem key={i} img={item.image} title={item.name} note={item.note}/>
          </Link>
      ));
    }}
  </Query>
);

export default Network;
