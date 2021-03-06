/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { core } from "@nexus/schema"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Date";
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: Date
  DateTime: Date
}

export interface NexusGenRootTypes {
  Query: {};
  User: { // root type
    birthdate: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    gender: string; // String!
    id: string; // String!
    name: string; // String!
    nationality: string; // String!
    password: string; // String!
    phone: string; // String!
    pictureUrl: string; // String!
    salt: string; // String!
    username: string; // String!
  }
  UserSearchResult: { // root type
    count: number; // Int!
    cursor?: string | null; // String
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
  Date: NexusGenScalars['Date'];
  DateTime: NexusGenScalars['DateTime'];
}

export interface NexusGenFieldTypes {
  Query: { // field return type
    getAllNationalities: string[]; // [String!]!
    getFilteredUsers: NexusGenRootTypes['UserSearchResult']; // UserSearchResult!
  }
  User: { // field return type
    birthdate: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    gender: string; // String!
    id: string; // String!
    name: string; // String!
    nationality: string; // String!
    password: string; // String!
    phone: string; // String!
    pictureUrl: string; // String!
    salt: string; // String!
    username: string; // String!
  }
  UserSearchResult: { // field return type
    count: number; // Int!
    cursor: string | null; // String
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
}

export interface NexusGenArgTypes {
  Query: {
    getFilteredUsers: { // args
      contains?: string | null; // String
      cursor?: string | null; // String
      endDate?: NexusGenScalars['DateTime'] | null; // DateTime
      nationality?: string | null; // String
      startDate?: NexusGenScalars['DateTime'] | null; // DateTime
      take?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Query" | "User" | "UserSearchResult";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Date" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}