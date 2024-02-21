import React from 'react';
import { useDispatch } from 'react-redux';
import { openOrCloseAddOrEdit } from '../../actions/posts';
import { Detector } from "react-detect-offline";
import Button from 'react-bootstrap/Button';


export const AddButtonFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( openOrCloseAddOrEdit() );
    }


    return (
        <Detector
            render={({ online }) => {
                return <Button
                    className="btn btn-primary fab"
                    onClick={ handleClickNew }
                    disabled={ !online }
                >
                    <i className="fas fa-plus"></i>
                </Button>
            }}
        />
    )
}
