# Hostly

Hostly is a self-hosted deployment platform designed to automate the process of building, containerizing, and deploying web applications directly from a GitHub repository link to a live production server.

## Features

- **Automated Deployments:** Paste any GitHub repository URL to build, containerize, and deploy automatically.
- **User Authentication:** Secure login and user management via Clerk using OAuth or email.
- **Personal Dashboard:** Manage, monitor, and track all your active deployments from a single interface.
- **Sub-Second Routing:** A custom Node.js reverse proxy routes incoming traffic to S3-hosted build outputs for quick response times.
- **Scalable Infrastructure:** Automatically handles container management using Docker, Amazon ECR, and Amazon ECS.

## Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Authentication:** Clerk (OAuth, Email)
- **Containerization & Cloud:** Docker, AWS (ECR, ECS, S3)
- **DevOps:** CI/CD Pipelines

## Architecture Overview

1. **Authentication:** Users sign in through the React frontend using Clerk.
2. **Trigger:** A user provides a public GitHub repository link via the dashboard.
3. **Build & Containerize:** Hostly triggers a workflow that builds the static output, packages it into a Docker image, and uploads it to **Amazon ECR**.
4. **Orchestration:** **Amazon ECS** pulls the image and manages the container lifecycle.
5. **Storage & Delivery:** Static assets are stored in **Amazon S3**, and a custom **Node.js reverse proxy** handles incoming requests, mapping custom routing directly to the deployed files.

## Getting Started

### Prerequisites

Make sure you have the following installed/configured before running locally:

- Node.js (v18 or higher)
- Docker Desktop
- An AWS Account (with access to S3, ECR, and ECS)
- A Clerk account for authentication keys

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/abhiyadav05/hostly.git
cd hostly
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the root directory and add the following credentials:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# AWS Configuration
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_ECR_REPOSITORY_URI=your_ecr_uri
AWS_S3_BUCKET_NAME=your_s3_bucket
```

4. **Run the application**

```bash
npm run dev
```

## Deployment

### Frontend

- **Platform:** Vercel

### Backend

- **Platform:** Vercel

## Author

| Detail | Information |
|--------|-------------|
| **Name** | Abhishek Yadav |
| **Degree** | B.Tech CSE (Artificial Intelligence) |
| **Institute** | Institute of Engineering and Technology (IET), Lucknow |
| **Role** | Full Stack Developer |
| **Competitive Programming** | LeetCode Knight, CodeChef 3-Star, Codeforces Specialist |
| **GitHub** | https://github.com/abhiyadav05 |
| **LinkedIn** | https://www.linkedin.com/in/abhishek-yadav-637136257/ |
