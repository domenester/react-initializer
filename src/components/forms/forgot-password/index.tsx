import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import EmailInput from '../input/email.input'
import { Button, Link, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { usePasswordServiceValue, useAlertServiceValue } from '../../../services'

export default function ForgotPasswordForm () {

  const { requestReset } = usePasswordServiceValue()
  const history = useHistory()
  const [ email, setEmail ] = useState('')
  const { multipleErrors, success } = useAlertServiceValue()

  const onSubmit = async (values: any) => {
    if (Object.keys(errors).length) {
      return multipleErrors(errors)
    }

    const response = await requestReset(email)
    if (response) {
      success(response.message)
      history.push('/login')
    }
  }

  const { handleSubmit, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='center'>
      <Grid container spacing={1}>
        <Grid container item xs={12} >
          <EmailInput
            errors={errors}
            register={register}
            setEmail={setEmail}
            defaultValue={email}
          />
        </Grid>
        <Grid container item xs={12} justify='center'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            data-testid={'buttonSubmit'}
          >
            Request Password
          </Button>
        </Grid>
        <Grid container item xs={12} justify='center'>
          <Link
            component="button"
            type="button"
            onClick={() => history.push('/login')}
          >
            Go Back
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}
