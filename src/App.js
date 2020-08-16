import React, { useEffect, useState } from 'react'
import { json2csvAsync } from 'json-2-csv'

import { makeStyles } from '@material-ui/core/styles'
import { Editor } from './components/Editor/Editor'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ReactFileReader from 'react-file-reader'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'


const useStyles = makeStyles((theme) => ({
	editor: {
		width: 400,
		height: 500,
	},
	container: {
		marginTop: theme.spacing(16),
	},
	input: {
		display: 'none',
	},
}))

const getJsonInternal = (json) => {
	try {
		return [JSON.parse(json)]
	} catch (e) {
		return undefined
	}
}

const App = () => {
	const classes = useStyles()

	const [json, setJson] = useState('')
	const [csv, setCsv] = useState('')

	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')

	useEffect(() => {
		json2csvAsync(getJsonInternal(json))
			.then(csv => {
				setCsv(csv)
				setOpen(false)
			})
			.catch(() => {
				setOpen(true)
				if (json.length === 0) {
					setMessage('Input is empty')
				} else {
					setMessage('Invalid JSON')
				}
			})
	}, [json])

	const handleClose = () => {
		setOpen(false)
	}


	const handleFiles = files => {
		const reader = new FileReader()
		reader.onload = async (e) => {
			const text = e.target.result
			setJson(text)
		}
		reader.readAsText(files[0])
	}

	const handleClear = () => {
		setJson('')
		setCsv('')
	};

	return (
		<Container maxWidth='md' className={classes.container}>
			<Grid container alignItems='center'>
				{/*----- JSON ------*/}
				<Grid item>
					<Grid container direction='column' spacing={1}>
						<Grid item className={classes.editor}>
							<Editor mode='json'
											placeholder='JSON'
											onChange={newval => setJson(newval)}
											value={json}
							/>
						</Grid>
						<Grid item>
							<ReactFileReader fileTypes={['.json']} handleFiles={handleFiles}>
								<Button variant='contained' color='primary' component='span' fullWidth>
									Upload File
								</Button>
							</ReactFileReader>
						</Grid>
					</Grid>
				</Grid>

				{/*----- Reverse button ------*/}
				<Grid item>
					<Grid container alignItems='center' style={{ height: '100%' }}>
						<div>
							<Button variant='contained' color='primary'>
								reverse
							</Button>
						</div>
					</Grid>
				</Grid>

				{/*----- CSV ------*/}
				<Grid item>
					<Grid container direction='column' spacing={1}>
						<Grid item className={classes.editor}>
							<Editor value={csv}
											placeholder='CSV'
							/>
						</Grid>

						<Grid item>
							<IconButton aria-label="delete" onClick={handleClear}>
								<DeleteIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			{/*----- Error message ------*/}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='error' elevation={6} variant='filled'>
					{message}
				</Alert>
			</Snackbar>
		</Container>
	)
}


export default App
