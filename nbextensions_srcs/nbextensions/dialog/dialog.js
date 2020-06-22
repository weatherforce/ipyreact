import React from 'react'
import Widget from '../../utils/widget/widget'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class IDialog extends Widget {

	constructor(props){
		super(props);
		this.handleClickOpen = this.handleClickOpen.bind(this)
		this.handleClickClose = this.handleClickClose.bind(this)
	}

	handleClickOpen(event){
		let data ={state: this.state} 
		data.state.open = true
		console.log(data)
		this.setState({open:true})	
        this.props.comm.send(data)
	}

	handleClickClose(event){
		let data ={state: this.state} 
		data.state.open = false 
		console.log(data)
		this.setState({open:false})	
        this.props.comm.send(data)
	}

	render(){
		return (
    <div>
      <Dialog
        open={this.state.open}
        onClose={this.handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
			{this.state.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClickClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this.handleClickClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
}

export default IDialog 
