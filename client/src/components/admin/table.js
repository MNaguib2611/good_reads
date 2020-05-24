import React from 'react';
import '../../styles/table.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Table = ({ cols, data, editUrl, delUrl }) => {
    return (
        <table id="table">
            <thead>
                <tr>
                    {cols.map((col) => {
                        return (
                            <th>{col.toUpperCase()}</th>
                        );
                    })}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((record) => {
                    return (
                        <tr>
                            {cols.map((col) => {
                                return (
                                    <td>
                                        {typeof record[col] == 'object' && record[col] != null 
                                        ? 
                                        record[col].name 
                                        : 
                                        record[col] == 0 ? "-" : record[col]}
                                    </td>
                                );
                            })}
                            <td className="actions">
                                <Link to={{
                                    pathname: editUrl,
                                    state: {
                                        record
                                    }
                                }} className="edit-record"><FontAwesomeIcon icon={faEdit}/></Link>
                                <Link to={{
                                    pathname: delUrl,
                                    state: {
                                        record
                                    }
                                }} className="delete-record"><FontAwesomeIcon icon={faTrash}/></Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;