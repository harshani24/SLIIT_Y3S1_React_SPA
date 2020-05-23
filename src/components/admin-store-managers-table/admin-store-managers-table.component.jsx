import React, {useContext, useEffect, useState} from 'react'
import {FaUserEdit, FaUserMinus} from 'react-icons/fa'
import './admin-store-managers-table-styles.scss'
import {AppContext} from '../../Context/app-context'
import axios from 'axios'

const ManageStoreManagerTable = () => {
  const appContext = useContext(AppContext)
  const [storeManagers, setStoreManagers] = useState([])

  const getStoreManagers = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/storemanager')
      const responseData = await response.json()
      setStoreManagers(responseData)
      appContext.addStoreManagers(responseData)
      appContext.editCategoryFalse()
      appContext.editExistingCategoryFalse()
    } catch (errors) {
      console.log(errors)
    }
  }

  useEffect(() => {
    getStoreManagers().then(() => {
    })
  }, [storeManagers])

  const EditStoreManager = (id) => {
    appContext.storeManagerEdit()
    appContext.setEditStoreManagerId(id)
    axios.get('http://localhost:5000/admin/storemanager/' + id)
      .then(response => {
        appContext.addStoreManagers(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const DeleteStoreManager = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/admin/storemanager/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
    } catch (errors) {
      console.log(errors)
    }
  }

  return (
    <div>
      <table className='table' style={{border: 'solid darkblue 1px'}}>
        <thead style={{backgroundColor: '#0350a2'}}>
        <th style={{borderBottom: 'solid darkblue 1px'}}>First Name</th>
        <th style={{borderBottom: 'solid darkblue 1px'}}>Last Name</th>
        <th style={{borderBottom: 'solid darkblue 1px'}}>Email</th>
        <th style={{borderBottom: 'solid darkblue 1px'}}>Phone Number</th>
        <th style={{borderBottom: 'solid darkblue 1px'}}/>
        <th style={{borderBottom: 'solid darkblue 1px'}}/>
        </thead>
        <tbody>
        {storeManagers.map((storeManager) => {
          return (
            <tr key={storeManager._id}>
              <td>{storeManager.firstName}</td>
              <td>{storeManager.lastName}</td>
              <td>{storeManager.email}</td>
              <td>{storeManager.teleNo}</td>
              <td>
                <button onClick={() => EditStoreManager(storeManager._id)} style={{color: 'darkgreen'}}>
                  <FaUserEdit size={25}/>
                </button>
              </td>
              <td>
                <button onClick={() => DeleteStoreManager(storeManager._id)} style={{color: 'indianred'}}>
                  <FaUserMinus size={25}/>
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default ManageStoreManagerTable
