---
title: Restarting a Start-up
subtitle: My Experience in Darsoon
date: 2023-12-03
color: 'c-orange-11'
bg: 'bg-gradient-to-br from-orange4 via-tomato4 to-red4'
href: '/works/darsoon'
logoSrc: '/darsoon/logo.png'
darkLogoSrc: '/darsoon/logo-dark.png'
features:
  - A Brand new website was created.
  - +80k rows from Google Sheets to Supabase migrated
  - +100 hours of weekly manual work automated

img: <img
  src='/darsoon/mockup.png'
  alt=''
  class="lt-xs:static lt-xs:w-6/5  lt-xs:mis-auto lt-xs:-mt-4 lt-xs:-mb-12 lt-xs:fade-y-from-30%-to-90%   xs:abs  -z-1  xs:w-60 xs:right-0 xs:top-10  sm:right-0  sm:top-10 sm:w-85 md:-right-15 md:top-5 md:w-110 drop-shadow-xl"
  />
stackLogos:
  - icon: i-logos-nextjs-icon
    name: NEXTjs
  - icon: i-logos-supabase-icon
    name: Supabase
  - icon: i-logos-react-query-icon
    name: React Query
  - icon: i-logos-unocss
    name: UnoCSS
---

This project was the one I learned the most. It was a complete full-stack project, plus automated data migration.

Darsoon is a startup in Toronto that provides online private classes to Iranian kids.

The startup is launched during the pandemic by a group of Iranians as their side hubby.

Initially, the website was created by WIX, and all the business data were manually entered into Google Sheets. Soon they get more and more users, and currently, they have around 3000 online sessions each month.

Even though they had a member in their team with crazy Google Sheet Skills and wrote lots of small scripts logic here and there, now the Google Sheet has reached its limit with more than 80000 records of different data. Besides, they still need to insert everything manually and have hired a dedicated person for this task.

## Results

### Migration Tool

A tailored NODE.js migration program that fetches data from Google Sheet validates it, casts it, creates necessary Foreign Keys, and insert it into Supabase (PostgreSQL) database.

### Dashboards for admins, teachers, and Students

A complete dashboard with all the functionalities each role needs. After implementing dashboards, Darsoon is entirely free of heavily loaded and lagging Google Sheets. Instead, Supabase, Nextjs, React query, and React-Table were used for this part.

### A Fully Redesigned Website with integrated Stripe payments

All the pages were redesigned and recreated, along with the dashboard pages.
And the final piece to make the system all automatic was the payment system.
We implemented the payment with stripe and integrated it back into Supabase.

### Previously overloaded Startup Administrators are now accessible for more meaningful work

The Manual Data Entry workload (+100 records a day) has been almost entirely automated.

Before, admins were responsible for collecting data from WIX, Google Forms, and messages and entering them manually in Google Sheets.

Another bottleneck that was completely tackled is calculating Monthly payments for teachers. Everything is calculated automatically.

Previously, calculating and paying the teachers was one week of work. The slow process could only estimate the monthly payroll for only 10 teachers.

Now, the system can tell the admin how much each teacher should be paid at any moment. Teachers also see the same report in their dashboards. This could not be possible with the initial data structure. Therefore I changed the schema to have this feature without losing any data or relationship between data.

Teachers and Students have dedicated dashboards that can check anytime and is always up to date. As a result, there is no more argument from teachers about not counting their sessions correctly.

## Data migration

I wrote a node js migration program tailored to their data, which on each migration iteration, checks all the types, checks if the data field is required or optional, and inserts data to Supabase, Table by Table.
Also, when needed, the migration fetches and filters data from previously inserted data to create Foreign Keys.

Users are the first entity that is migrated. The process for Migrating Users is the same. However, instead of inserting them as regular data records, the program assigns each user a random and strong password and signs them up in the Supabase Authentication service. Then a record of nonsensitive user info is inserted regular table, so it would be easier to query users in Admin Dashboard.

This part was the most frustrating part of the project. The data in Google Sheets was not even close to clean data. So, what I thought I could do in two weeks, took two months. But if I go back and redo it, I can do it in a week.

## Dashboards

This part was more fun. I created a custom Table with React Table that could handle Global filters, column filters, and sorting.

Also, I created a form component based on React-hook-form and Zod validator.

Also, I implemented full authentication.
Supabase comes with some react components for authentication which are very nice. But I needed more control and wanted to integrate it with react query.

Therefore, I created an authentication process including a login form, sign-up, reset password, and changed password forms. I rarely get involved with authentication in the teams. So this part, even though not the most complex part of the dashboard, was the one I was very proud of. It felt so good to figure authentication system, especially when I reset my password and logged in with my new password.

## Public Website

so far, the dashboards for current users are prepaid and there is still one crussial part of the project has to be done.
This future part will include rebuilding the public website as well as automating the data flow from payments to the database. The payment automation will eliminate the need of least manual work.

I am planning with Darsoon team for this part and in it with be complete in near future.

## Concolusion

The experience was so rewarding in terms of learning and understanding things. Here are the few I can think of:

- Understanding how to design a system to migrate data from structure A to structure B, no matter which kind of Database or Schema they have and how unclean the data

- Mastering how to use Supabase in any project, understanding the trade-offs and where it fits your product

- adding some more bits to my SQL knowledge

This project was huge amount of work and it came with huge amount of learning. I don't think I would accept such large scoped project again but, I am very proud of what I have done.

I will add links to the live website when the public website finishes.
