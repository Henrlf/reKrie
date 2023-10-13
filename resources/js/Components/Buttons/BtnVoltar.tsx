import {PageProps} from "@/types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLeftLong} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function BtnVoltar({destino}: PageProps<{ destino: string }>) {

    return (
        <div
            className="btn-group"
            style={{width: '115px'}}
        >
            <Button
                href={destino}
                variant="light"
                className="shadow border-black border-1 border-opacity-25 d-flex justify-content-center align-items-center mt-1 h-button"
            >
                <FontAwesomeIcon className="mt-lg-2 h5" style={{marginLeft: '1px', marginRight: '10px'}} icon={faLeftLong}/>
                Voltar
            </Button>
        </div>
    );
}
