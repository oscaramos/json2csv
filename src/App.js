import React, { useEffect, useState } from 'react'
import { csv2jsonAsync, json2csvAsync } from 'json-2-csv'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import fileDownload from 'js-file-download'
import ReactFileReader from 'react-file-reader'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Tooltip from '@material-ui/core/Tooltip'
import Alert from '@material-ui/lab/Alert'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { Editor } from './components/Editor/Editor'

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

function SourceToolbar({ getFileTypes, handleReadFiles }) {
	return (
		<ReactFileReader fileTypes={getFileTypes()} handleFiles={handleReadFiles}>
			<Button variant='contained' color='primary' fullWidth startIcon={<PublishIcon />}>
				Upload File
			</Button>
		</ReactFileReader>
	)
}

function TargetToolbar({ textToClipboard, handleClear, handleDownloadFile }) {
	const [openTooltip, setOpenTooltip] = useState(false)

	const handleCopyClipboard = () => {
		setOpenTooltip(true)
	}

	const handleCloseTooltip = () => {
		setOpenTooltip(false)
	}

	return (
		<Grid container spacing={2} justify='space-between'>
			<Grid item>
				<Button
					variant='contained' color='primary' size='large'
					startIcon={<DeleteIcon />}
					onClick={handleClear}
				>
					Clear
				</Button>
			</Grid>

			<Grid item>
				<Button
					variant='contained' color='primary' size='large'
					startIcon={<SaveIcon />}
					onClick={handleDownloadFile}
				>
					Save
				</Button>
			</Grid>

			<Grid item>
				<CopyToClipboard text={textToClipboard()}
												 onCopy={handleCopyClipboard}>
					<Tooltip open={openTooltip} onClose={handleCloseTooltip} title='Copied' arrow>
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
	)
}

function ToolbarSwitchable(props) {
	if (props.switch) {
		return <SourceToolbar getFileTypes={props.getFileTypes}
													handleReadFiles={props.handleReadFiles}
		/>
	} else {
		return <TargetToolbar handleClear={props.handleClear}
													handleDownloadFile={props.handleDownloadFile}
													textToClipboard={props.textToClipboard}
		/>
	}
}

const getJsonInternal = (json) => {
	try {
		const parsed = JSON.parse(json)
		return Array.isArray(parsed) ? parsed : [parsed]
	} catch (e) {
		return undefined
	}
}

function App() {
	const classes = useStyles()
	const [isJsonToCsv, setIsJsonToCsv] = useState(true)

	const [json, setJson] = useState('')
	const [csv, setCsv] = useState('')

	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	const theme = useTheme()
	const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

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

	const handleReadFiles = files => {
		const reader = new FileReader()
		reader.onload = async (e) => {
			const text = e.target.result

			if (isJsonToCsv) {
				setJson(text)
			} else {
				// Removes file endline
				const newText = text.replace(/\r/g, '')
				setCsv(newText)
			}
		}
		reader.readAsText(files[0])
	}

	const handleClear = () => {
		setJson('')
		setCsv('')
	}

	const handleDownloadFile = () => {
		if (isJsonToCsv) {
			fileDownload(csv, 'json_converted.csv')
		} else {
			fileDownload(json, 'csv_converted.json')
		}
	}

	const textToClipboard = () => {
		return isJsonToCsv ? csv : json
	}

	const getFileTypes = () => {
		return isJsonToCsv ? ['.json'] : ['.csv']
	}

	return (
		<Container maxWidth='md' className={classes.container}>
			<Grid container
						alignItems='center'
						direction={matchesSM ? 'column' : 'row'}
						spacing={matchesSM ? 4: 2}
			>
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
							<ToolbarSwitchable switch={isJsonToCsv}
																 getFileTypes={getFileTypes}
																 handleReadFiles={handleReadFiles}
																 handleClear={handleClear}
																 handleDownloadFile={handleDownloadFile}
																 textToClipboard={textToClipboard}
							/>
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
							<Grid item>
								<ToolbarSwitchable switch={!isJsonToCsv}
																	 getFileTypes={getFileTypes}
																	 handleReadFiles={handleReadFiles}
																	 handleClear={handleClear}
																	 handleDownloadFile={handleDownloadFile}
																	 textToClipboard={textToClipboard}
								/>
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
