import crypto from 'crypto';

interface ICompany {
  name: string;
  website: string;
  cnpj: number;
  owner_id: string;
}

export class Company {
  props: ICompany;
  id: string;

  constructor(props: ICompany, id?: string) {
    this.id = id || crypto.randomUUID();
    this.props = { ...props };
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get website() {
    return this.props.website;
  }

  set website(value: string) {
    this.props.website = value;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  set cnpj(value: number) {
    this.props.cnpj = value;
  }

  get owner_id() {
    return this.props.owner_id;
  }

  set owner_id(value: string) {
    this.props.owner_id = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
