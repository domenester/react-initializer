import React, { Component } from 'react'

interface IProps {
  errors: {
    [key: string]: { message: string }
  },
  type: string
}

export default class message extends Component<IProps> {
  render() {
    const { errors, type } = this.props
    return (
      <small>
        {errors[type].message}
      </small>
    )
  }
}
