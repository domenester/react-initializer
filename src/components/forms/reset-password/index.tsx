import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PasswordInput from '../input/password.input'
import { Button, Link, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { usePasswordServiceValue, useAlertServiceValue } from '../../../services'
import * as qs from 'qs'

export default function ResetPasswordForm () {

  const { reset } = usePasswordServiceValue()
  const history = useHistory()
  const [ password, setPassword ] = useState('')
  const { multipleErrors, success } = useAlertServiceValue()

  const onSubmit = async (values: any) => {
    if (Object.keys(errors).length) {
      return multipleErrors(errors)
    }

    const token = qs.parse(window.location.search, { ignoreQueryPrefix: true }).token
    localStorage.setItem('token', token)
    const response = await reset(password)
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
          <PasswordInput
            errors={errors}
            register={register}
            setPassword={setPassword}
            defaultValue={password}
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
            Reset Password
          </Button>
        </Grid>
        <Grid container item xs={12} justify='center'>
          <Link
            component="button"
            type="button"
            onClick={() => history.push('/login')}
          >
            Login
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}
