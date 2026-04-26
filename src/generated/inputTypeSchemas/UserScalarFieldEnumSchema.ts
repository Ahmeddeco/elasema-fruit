import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','personalId','createdAt','updatedAt','role','banned','banReason','banExpires','mainMobile','secondaryMobile','country','state','city','detailedAddress','gps']);

export default UserScalarFieldEnumSchema;
