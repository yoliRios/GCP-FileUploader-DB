# GCP File Uploader and PostgreSQL User Management App

## Overview

This project is a full-stack web application built using **Next.js** for the front-end and **Flask** for the back-end. The app allows users to:
- Upload files to a **Google Cloud Storage Bucket**.
- Insert and fetch user data (name and email) from a **PostgreSQL database** hosted on **Google Cloud**.

The application is containerized using **Docker** and can be deployed in a **Kubernetes** environment.

## Features

- **File Upload**: Upload files directly to a Google Cloud Storage bucket.
- **User Management**: Insert and retrieve users from a PostgreSQL database.
- **Responsive Design**: Frontend built with **Next.js**, styled for a smooth user experience.
- **API Interaction**: The frontend communicates with the Flask backend via API endpoints.

## Architecture

- **Frontend**: A React-based **Next.js** application that allows users to interact with the backend services.
- **Backend**: A **Flask** API that connects to a **PostgreSQL** database and handles file uploads to **Google Cloud Storage**.
- **Database**: A **Google Cloud PostgreSQL** instance for storing user information.
- **Storage**: **Google Cloud Storage** bucket for storing uploaded files.

## Technologies Used

- **Frontend**: 
  - [Next.js](https://nextjs.org/)
  - React
  - CSS for styling
- **Backend**:
  - [Flask](https://flask.palletsprojects.com/)
  - [psycopg2](https://pypi.org/project/psycopg2/) for PostgreSQL connection
  - [Google Cloud Storage](https://cloud.google.com/storage)
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Version Control**: GitHub
- **Deployment**: Kubernetes (optional)

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/)
- [Python 3](https://www.python.org/)
- [Google Cloud SDK](https://cloud.google.com/sdk)

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
