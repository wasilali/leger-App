import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { toast } from 'react-toastify';
import axios from 'axios'
import Loading from './Loading';
import dayjs from "dayjs"
export default function DataTable() {

  const [legers,setLegers]=React.useState(null)
console.log("legers",legers);
const [openDialog, setOpenDialog] = React.useState(false);
const [idd, setIdd] = React.useState(false);
const [openDialoge, setOpenDialoge] = React.useState(false);
const [money, setTransactionAmount] = React.useState();
const [showDetailsDialog, setShowDetailsDialog] = React.useState(false);
const [menuArry,setMenuArry]=React.useState([])



const [loading, setLoading] = React.useState(false);
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'date', headerName: 'Date', width: 240 },
    { field: 'name', headerName: 'Name', width: 240 },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'money', headerName: 'Transactions', width: 240 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title="Edit Money">
            <IconButton color="info" onClick={() => handleTransButtonClick(params.id)}>
              <SyncAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Show Transactions">
            <IconButton color="primary" onClick={() => handleDetailsButtonClick(params.id)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Krza dana">
            <IconButton color="info" onClick={() => handleKrza(params.id)}>
              <ReceiptLongIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => handleDeleteButtonClick(params.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
const handleKrza= (id) => {
  console.log(id);
  setOpenDialoge(true)
  setIdd(id)
  const menue=legers.filter((leg)=>(leg._id !==id))
setMenuArry(menue);
}
  const rows = [];

  legers &&
  legers.forEach((item) => {
      rows.push({
        id: item._id,
        date: dayjs(item.date).format(Date.now()?"HH:mm:ss":"YYYY-MM-DD"),
        email: item.email,
        name: item.name,
        money: item.money,

      });
    });

  const handleTransButtonClick = (id) => {
    setOpenDialog(true);

    setIdd(id)
  };

  const handleTransactionSubmit = async () => {
    // Perform transaction submission logic
    try {
      setLoading(true);
      const moneyValue = Number(money);
      if (isNaN(moneyValue)) {
        console.log('Invalid money value'); // Throw an error if the value is not a valid number
      }
      
      const { data } = await axios.put(`http://localhost:4000/api/v1/addMoney/${idd}`, {moneyValue});
      if (data) {
        getData()
        toast.success(data.message)
      }
  
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };
  

  const handleDeleteButtonClick = async(id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`http://localhost:4000/api/v1/deleteLeger/${id}`);
      if (data) {
        toast.success(data.message);
        getData()
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
    console.log('Deleted ID:', id);
  };

  const handleDetailsButtonClick = (id) => {
    setShowDetailsDialog(true);
    setIdd(id)
    console.log("idd",idd);
  };

  const handleDetailsDeleteButtonClick = () => {
    setShowDetailsDialog(false);
  };


  const getData =async()=>{

    try {
      setLoading(true)
      const {data} = await axios.get("http://localhost:4000/api/v1/getAll")
      if (data) {
        setLegers(data.legers)
      }
      
    } catch (error) {
      toast.error("internet Connection lose please restart your server");
      setLoading(false)

    } finally{
      setLoading(false)
    }
  }
  const [leger,setLeger]=React.useState(null)

    const getSingleData =async()=>{
      try {
        setLoading(true)
        const {data} = await axios.get(`http://localhost:4000/api/v1/getLeger/${idd}`)
        setLeger(data.leger.transections.reverse());
        
      } catch (error) {
        toast.error(error.response?.data?.message);
        setLoading(false)
  
      } finally{
        setLoading(false)
      }
    }


  React.useEffect(()=>{
    getData();
  if (showDetailsDialog) {
    getSingleData()
  }
  },[showDetailsDialog])
  const [selectedReason, setSelectedReason] = React.useState("");
  const [reasonDialogOpen, setReasonDialogOpen] = React.useState(false);
  
  const handleReasonClick = (id) => {
    setSelectedReason(id);
    setReasonDialogOpen(true);
    console.log('Reason ID:', id);
  };
  
  const detailsColumns = [
    { field: 'date', headerName: 'Date', width: 80 },
    { field: 'leyaha', headerName: 'to', width: 80 },
    { field: 'deyaha', headerName: 'From', width: 80 },
    { field: 'reason', headerName: 'Reason', width: 200, renderCell: (params) => (
      <div style={{ cursor: 'pointer' }} onClick={() => handleReasonClick(params.row.reason)}>
        {params.value}
      </div>
    ) },
    {
      field: 'add',
      headerName: 'Transaction',
      width: 80,
      renderCell: (params) => (
        <div style={{ color: params.row.add > 0 ? 'green' : 'red' }}>{params.row.add}</div>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => deletedetail(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const deletedetail = async (moneyId) => {
    console.log("idddd", moneyId, idd);
    try {
      setLoading(true);
      const { data } = await axios.delete(`http://localhost:4000/api/v1/deleteTransections/${idd}?moneyId=${moneyId}`);
      if (data) {
        toast.success(data.message);
        getSingleData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const detailsRows = [];

  leger &&
  leger.forEach((item) => {
    detailsRows.push({
        id: item._id,
        date: dayjs(item.date).format(Date.now()?"HH:mm:ss":"YYYY-MM-DD"),
        deyaha: item.deyaha,
        leyaha: item.leyaha,
        add: item.add&&item.add,
        reason:item.reason&&item.reason

      });
    });



  // const handleOpenDialog = () => {
  //   setOpenDialoge(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialoge(false);
  // };

  const [loanType, setLoanType] = React.useState('');
  const [loanAmount, setLoanAmount] = React.useState('');
  const [reason, setReason] = React.useState('');

  const handleLoanTypeChange = (event) => {
    setLoanType(event.target.value);
  };

  const handleLoanAmountChange = (event) => {
    setLoanAmount(event.target.value);
  };

  const handleDialogClose = () => {
    setLoanType('');
    setLoanAmount('');
    setOpenDialoge(false)
  };

  const handleLoanSubmit = async() => {
    try {
      const krzaDeya={
        reason,
        money:Number(loanAmount)
      }
      setLoading(true);
      const { data } = await axios.put(`http://localhost:4000/api/v1/krzaDana?id=${idd}&lanaWaliID=${loanType}`,krzaDeya);

      if (data) {
        toast.success(data.message);
        handleDialogClose();
        getData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
     {loading? <div className=' w-full mt-10 flex justify-center items-center'><Loading/></div>: <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          disableClickEventBubbling: true,
        }))}
        pageSize={5}
        disableColumnSelector
        disableSelectionOnClick
        components={{
          Toolbar: () => null, // Disable default toolbar
        }}
        componentsProps={{
          pagination: {
            disableNavigation: true, // Disable pagination navigation
          },
        }}
        disableColumnMenu
      />}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: '1rem' }}>
            You can add or minus money from total amount:
          </div>
          <TextField
            label="Transaction Amount"
            type="number"
            value={money}
            onChange={(e) => setTransactionAmount(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color='error'>Cancel</Button>
          <Button onClick={handleTransactionSubmit} variant="contained" color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDetailsDialog} onClose={() => setShowDetailsDialog(false)}>
        <DialogTitle>Show Transactions</DialogTitle>
        <DialogContent>
          <div style={{ height: 300, width: '100%' }}>
           {loading? <div className=' w-full h-auto px-[10rem]  lg:px-[15rem] mt-10 flex justify-center text-center my-auto  items-center'><Loading/></div>: <DataGrid
              rows={detailsRows}
              columns={detailsColumns}
              disableColumnSelector
              disableColumnMenu
              disableSelectionOnClick
            />}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsDeleteButtonClick} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialoge} onClose={handleDialogClose}>
      <DialogTitle>Krza Loan Application</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: '1rem' }}>Give loan by Selecting User and add loan amount:</div>
        <InputLabel id="loan-type-label">Select User</InputLabel>
        <Select
          labelId="loan-type-label"
          id="loan-type-select"
          value={loanType}
          onChange={handleLoanTypeChange}
          fullWidth
        >
          {
            menuArry&&menuArry.map((leg)=>(
              <MenuItem key={leg._id} value={leg._id}> <span className=' text-purple-500'>name:</span> {leg.name} <span className=' text-purple-500'>  email:  </span>{leg.email} of users</MenuItem>
            ))
          }
        </Select>
        <TextField
          label="Loan Amount"
          type="number"
          value={loanAmount}
          style={{marginTop:"2rem"}}
          onChange={handleLoanAmountChange}
          fullWidth
        />
        <TextField
          label="Reason"
          type="text"
          value={reason}
          style={{marginTop:"2rem"}}
          onChange={e=>setReason(e.target.value)}
          fullWidth
        />
        <div style={{ marginTop: '1rem' }}>A loan is a financial product that allows individuals to borrow a specific amount of money. It is typically repaid with interest over a predetermined period of time. Please enter the loan type and amount to apply for a loan.</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="error">Cancel</Button>
        <Button onClick={handleLoanSubmit} variant="contained" color="success">Apply</Button>
      </DialogActions>
    </Dialog>
    <Dialog open={reasonDialogOpen} onClose={() => setReasonDialogOpen(false)}>
  <DialogTitle>Reason Details</DialogTitle>
  <DialogContent>
    <p>{selectedReason}</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setReasonDialogOpen(false)} color="warning">
      Close
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
}
