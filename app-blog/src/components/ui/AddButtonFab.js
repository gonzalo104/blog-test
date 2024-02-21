import React from 'react';
import { useDispatch } from 'react-redux';
import { openOrCloseAddOrEdit } from '../../actions/posts';

export const AddButtonFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( openOrCloseAddOrEdit() );
    }


    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
