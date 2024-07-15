# 1. Anonymous

All users can SELECT below tables:
category
expertise
feedback
post
profileSubcategory
siteProfile
teacher
topic

No anonymous users can INSERT, UPDATE or DELETE any rows in any table.

# 2. Authenticated

## post✅

### SELECT

All users can SELECT this table.

### INSERT

only admin users who has “hasBlogManagementAccess”, can INSERT in this table.

### UPDATE

only admin users who has “hasBlogManagementAccess”, can UPDATE in this table.

### DELETE

only admin users who has “hasBlogManagementAccess”, can DELETE in this table.

## user✅

### SELECT

Only admins can SELECT this table.

Each User can select it's own user, or related users (students, teachers , ...)

### INSERT

only admin users who has “hasUserManagementAccess” and payer, can INSERT in this table.

### UPDATE

only admin users who has “hasUserManagementAccess”, can UPDATE in this table.

### DELETE

only admin users who has “hasUserManagementAccess”, can DELETE in this table.

## teacher✅

### SELECT

admins, tutors and payers can SELECT this table.

### INSERT

only admin users who has “hasUserManagementAccess”, can INSERT in this table.

### UPDATE

only admin users who has “hasUserManagementAccess” and teachers, can UPDATE in this table.

### DELETE

only admin users who has “hasUserManagementAccess”, can DELETE in this table.

## payer✅

### SELECT

Admins can SELECT this table. Payers and teachers can only SELECT the rows that are related to them.

### INSERT

only admin users who has “hasUserManagementAccess” and payer, can INSERT in this table.

### UPDATE

admins who has “hasUserManagementAccess” and payers, can UPDATE this table.

### DELETE

only admin users who has “hasUserManagementAccess”, can DELETE this table.

## admin✅

### SELECT

Only admins can SELECT in this table.

### INSERT

admins who has “hasAccessManagementAccess” can INSERT in this table.

### UPDATE

admins who has “hasAccessManagementAccess” can UPDATE in this table.

### DELETE

admins who has “hasAccessManagementAccess” can DELETE in this table.

## student✅

### SELECT

Admins can SELECT this table. Payers and teachers can only SELECT the rows that are related to them.

### INSERT

admins who has “hasUserManagementAccess”, and payers can INSERT into this table.

### UPDATE

admins who has “hasUserManagementAccess” and payers, can UPDATE this table.

### DELETE

Only admins who has “hasUserManagementAccess”, can DELETE in this table.

## log tables✅

### SELECT

only admins who has “hasVisitLogsAccess” can SELECT this table.

### INSERT

only admins who has “hasVisitLogsAccess” can INSERT this table.

### UPDATE

only admins who has “hasVisitLogsAccess” can UPDATE this table.

### DELETE

only admins who has “hasVisitLogsAccess” can DELETE this table.

## topic✅

### SELECT

All users can SELECT this table.

### INSERT

only admin users who has “hasMasterDataAccess”, can INSERT this table.

### UPDATE

only admin users who has “hasMasterDataAccess”, can UPDATE this table.

### DELETE

only admin users who has “hasMasterDataAccess”, can DELETE this table.

## expertise✅

### SELECT

All users can SELECT this table.

### INSERT

only admins who has “hasMasterDataAccess”, can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess”, can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess”, can DELETE this table.

## category✅

### SELECT

All users can SELECT this table.

### INSERT

only admins who has “hasMasterDataAccess”, can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess”, can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess”, can DELETE this table.

## profileSubcategory✅

### SELECT

All users can SELECT this table.

### INSERT

only admins who has “hasMasterDataAccess”, can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess”, can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess”, can DELETE this table.

## siteProfile✅

### SELECT

All users can SELECT this table.

### INSERT

only admins who has “hasMasterDataAccess”, can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess”, can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess”, can DELETE this table.

## course✅

### SELECT

Admins can SELECT this table. Payers and teachers can only SELECT the rows that are related to them.

### INSERT

admins who has “hasMasterDataAccess” and payers, can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess”, can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess”, can DELETE this table.

## courseStudent✅

### SELECT

Admins can SELECT this table. Payers and teachers can only SELECT the rows that are related to them.

### INSERT

admins who has “hasMasterDataAccess” and payers, can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess”, can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess”, can DELETE this table.

## workshopInfo✅

### SELECT

All users can SELECT this table.

### INSERT

admins who has “hasMasterDataAccess”, can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess”, can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess”, can DELETE this table.

## packagePurchased✅

### SELECT

Admins can SELECT this table. Payers and teachers can only SELECT the rows that are related to them.

### INSERT

admins who has “hasMasterDataAccess” and payers, can INSERT this table.

### UPDATE

Only admins who has “hasMasterDataAccess”, can UPDATE this table.

### DELETE

Only admins who has “hasMasterDataAccess”, can DELETE this table.

## session✅

### SELECT

Admins can SELECT this table. Payers and teachers can only SELECT the rows that are related to them.

### INSERT

admins who has “hasMasterDataAccess” and teachers, can INSERT this table.

### UPDATE

admins who has “hasMasterDataAccess” and teachers, can UPDATE this table.

### DELETE

admins who has “hasMasterDataAccess” and teachers, can DELETE this table.

## paymentToTeacher✅

### SELECT

only admins who has “hasMasterDataAccess” can SELECT this table.

### INSERT

only admins who has “hasMasterDataAccess” can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess” can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess” can DELETE this table.

## paymentByPayer✅

### SELECT

admins who has “hasMasterDataAccess” and payers who paid that specific payment, can SELECT this table.

### INSERT

admins who has “hasMasterDataAccess” and payers can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess” can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess” can DELETE this table.

## feedback✅

### SELECT

All users can SELECT this table.

### INSERT

admins who has “hasMasterDataAccess” and payers who has a course with that specific teacher, can INSERT this table.

### UPDATE

admins who has “hasMasterDataAccess” and payers who has a course with that specific teacher, can UPDATE this table.

### DELETE

admins who has “hasMasterDataAccess”, can DELETE this table.

## tutorApplication✅

### SELECT

Only admins can SELECT this table.

### INSERT

All users can INSERT into this table.

### UPDATE

admins who has “hasMasterDataAccess”, can UPDATE this table.

### DELETE

admins who has “hasMasterDataAccess”, can DELETE this table.

## giftForTecaher✅

### SELECT

only admins who has “hasMasterDataAccess” can SELECT this table.

### INSERT

only admins who has “hasMasterDataAccess” can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess” can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess” can DELETE this table.

## currencyExchangeRate✅

### SELECT

Admins who has “hasMasterDataAccess” and teachers can SELECT this table.

### INSERT

only admins who has “hasMasterDataAccess” can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess” can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess” can DELETE this table.

## coupon✅

### SELECT

admins who has “hasMasterDataAccess” and payers can SELECT this table.

### INSERT

only admins who has “hasMasterDataAccess” can INSERT this table.

### UPDATE

only admins who has “hasMasterDataAccess” can UPDATE this table.

### DELETE

only admins who has “hasMasterDataAccess” can DELETE this table.

# 3. Service Role

All users can SELECT, INSERT, UPDATE and DELETE any table.