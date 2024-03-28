import crypto from 'crypto';
import { Exception } from '../../../@core/application/utils/app-exception';
import { Company } from '../company/company';

interface IUser {
  name: string;
  email: string;
  password: string;
  company: Company;
}

export class User {
  id?: string;
  props: IUser;

  constructor(props: IUser, id?: string) {
    this.id = id || crypto.randomUUID();
    this.props = { ...props };
  }

  updateName(value: string) {
    if (value === '') {
      throw new Exception('name cannot be empty', 400);
    }

    this.name = value;
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get password() {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
  }

  get company() {
    return this.props.company;
  }

  set company(value: Company) {
    this.props.company = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
