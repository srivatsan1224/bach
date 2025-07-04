
import { Request, Response, NextFunction } from "express";

export const validateJobCreation = (req: Request, res: Response, next: NextFunction): void => {
  const { title, company, location, type, salary, description, contactEmail } = req.body;

  if (!title || !company || !location || !type || !salary || !description || !contactEmail) {
    res.status(400).json({ 
      error: "Missing required fields: title, company, location, type, salary, description, contactEmail" 
    });
    return;
  }

  if (!["full-time", "part-time", "contract", "internship"].includes(type)) {
    res.status(400).json({ 
      error: "Invalid job type. Must be one of: full-time, part-time, contract, internship" 
    });
    return;
  }

  if (typeof salary !== "number" || salary <= 0) {
    res.status(400).json({ error: "Salary must be a positive number" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contactEmail)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  next();
};

export const validateJobUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { type, salary, contactEmail } = req.body;

  if (type && !["full-time", "part-time", "contract", "internship"].includes(type)) {
    res.status(400).json({ 
      error: "Invalid job type. Must be one of: full-time, part-time, contract, internship" 
    });
    return;
  }

  if (salary && (typeof salary !== "number" || salary <= 0)) {
    res.status(400).json({ error: "Salary must be a positive number" });
    return;
  }

  if (contactEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }
  }

  next();
};
