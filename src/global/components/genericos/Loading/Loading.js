import { IonSpinner } from "@ionic/react";
import React from "react";
import { LoadingContainer } from "./localStyle";

const Loading = ({ dataLoading, color,descripcion }) => {
  return (
    <React.Fragment>
      {dataLoading && (
        <LoadingContainer>
          <span className={color}>
            <IonSpinner name="lines"/>
          </span>
          <span className={`${color} rb18m`}>{descripcion}</span>
        </LoadingContainer>
      )}
    </React.Fragment>
  );
};

export default Loading;
