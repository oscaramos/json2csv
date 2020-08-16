import React, { useEffect, useState } from 'react'
import { json2csvAsync, csv2jsonAsync } from 'json-2-csv'
import fileDownload from 'js-file-download'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { makeStyles } from '@material-ui/core/styles'
import { Editor } from './components/Editor/Editor'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ReactFileReader from 'react-file-reader'
import Tooltip from '@material-ui/core/Tooltip'

import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import PublishIcon from '@material-ui/icons/Publish'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { ReactComponent as ClipboardIcon } from './assets/clipboard.svg'


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
	const [isJsonToCsv, setIsJsonToCsv] = useState(false)

	const [json, setJson] = useState('')
	const [csv, setCsv] = useState('')

	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')

	const [openTooltip, setOpenTooltip] = useState(false)

	useEffect(() => {
		if (isJsonToCsv) {
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
		}
	}, [json, isJsonToCsv])

	useEffect(() => {
		if (!isJsonToCsv) {
			csv2jsonAsync(csv)
				.then(json => {
					setJson(JSON.stringify(json, null, 4))
					setOpen(false)
				})
				.catch(() => {
					setOpen(true)
					if (csv.length === 0) {
						setMessage('Input is empty')
					} else {
						setMessage('Invalid CSV')
					}
				})
		}
	}, [csv, isJsonToCsv])

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
	}

	const handleDownloadCsv = () => {
		fileDownload(csv, 'json_converted.csv')
	}

	const handleCopyClipboard = () => {
		setOpenTooltip(true)
	}

	return (
		<Container maxWidth='md' className={classes.container}>
			<Grid container alignItems='center' spacing={2}>
				{/*----- JSON ------*/}
				<Grid item>
					<Grid container direction='column' spacing={1}>
						<Grid item className={classes.editor}>
							<Editor mode='json'
											placeholder='JSON'
											onChange={newval => setJson(newval)}
											value={json}
											style={{ borderRadius: '5px' }}
							/>
						</Grid>

						<Grid item>
							<ReactFileReader fileTypes={['.json']} handleFiles={handleFiles}>
								<Button variant='contained' color='primary' fullWidth
												startIcon={<PublishIcon />}>
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
							{
								isJsonToCsv ?
									<Button variant='contained' color='primary'
													endIcon={<ArrowForwardIcon />}
													onClick={() => setIsJsonToCsv(false)}>
										To
									</Button>
									:
									<Button variant='contained' color='primary'
													startIcon={<ArrowBackIcon />}
													onClick={() => setIsJsonToCsv(true)}>
										To
									</Button>
							}
						</div>
					</Grid>
				</Grid>

				{/*----- CSV ------*/}
				<Grid item>
					<Grid container direction='column' spacing={1}>
						<Grid item className={classes.editor}>
							<Editor placeholder='CSV'
											value={csv}
											onChange={newval => setCsv(newval)}
											style={{ borderRadius: '5px' }}
							/>
						</Grid>

						<Grid item>
							<Grid container spacing={2} justify='space-between'>
								<Grid item>
									<Button
										variant='contained' color='primary' size='large'
										startIcon={<DeleteIcon />}
										onClick={handleClear}
									>
										Delete
									</Button>
								</Grid>

								<Grid item>
									<Button
										variant='contained' color='primary' size='large'
										startIcon={<SaveIcon />}
										onClick={handleDownloadCsv}
									>
										Save
									</Button>
								</Grid>

								<Grid item>
									<CopyToClipboard text={csv}
																	 onCopy={handleCopyClipboard}>
										<Tooltip open={openTooltip} onClose={() => setOpenTooltip(false)} title='Copied' arrow>
											<Button
												variant='contained' color='primary' size='large'
												startIcon={<ClipboardIcon />}
											>
												Copy
											</Button>
										</Tooltip>
									</CopyToClipboard>
								</Grid>
							</Grid>
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
