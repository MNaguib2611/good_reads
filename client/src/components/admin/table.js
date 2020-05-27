import React from 'react';
import '../../styles/table.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Table = ({ cols, data, editUrl, delUrl, del }) => {
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
                                        { col === "image"?
                                            <img style={{width: "50px", height: "50px"}} src= {typeof record[col] == 'object' && record[col] != null
                                                ? 
                                                "http://localhost:5000/"+record[col]                                               :
                                                record[col] == 0 ? "-" : "http://localhost:5000/"+record[col]
                                            }/>
                                            : typeof record[col] == 'object' && record[col] != null 
                                                ? 
                                                record[col].name 
                                                : 
                                                record[col] == 0 ? "-" : record[col]
                                        }

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
                                {del ?
                                    <a onClick={() => del(record)} className="delete-record"><FontAwesomeIcon icon={faTrash}/></a>
                                    :
                                    <Link to={{
                                        pathname: delUrl,
                                        state: {
                                            record
                                        }
                                    }} className="delete-record"><FontAwesomeIcon icon={faTrash}/></Link>
                                }
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;