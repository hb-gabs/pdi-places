import crypto from 'crypto';
import { Company } from '../company/company';

interface IPlace {
  name: string;
  cep: number;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  company?: Company,
}

export class Place {
  id?: string;
  props: IPlace;

  constructor(props: IPlace, id?: string) {
    this.props = { ...props };
    this.id = id || crypto.randomUUID();
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get cep() {
    return this.props.cep;
  }

  set cep(value: number) {
    this.props.cep = value;
  }

  get street() {
    return this.props.street;
  }

  set street(value: string) {
    this.props.street = value;
  }

  get number() {
    return this.props.number;
  }

  set number(value: number) {
    this.props.number = value;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  set neighborhood(value: string) {
    this.props.neighborhood = value;
  }

  get city() {
    return this.props.city;
  }

  set city(value: string) {
    this.props.city = value;
  }
  get state() {
    return this.props.state;
  }

  set state(value: string) {
    this.props.state = value;
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
