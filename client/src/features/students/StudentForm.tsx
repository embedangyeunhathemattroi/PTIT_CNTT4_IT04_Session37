import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import type { Student } from "./types";

interface Props {
  open: boolean;
  initial?: Partial<Student>;
  onClose: () => void;
  onSubmit: (data: {
    id?: string;
    name: string;
    age: number;
    grade: string;
  }) => void;
  students?: Student[];
}

const StudentForm: React.FC<Props> = ({
  open,
  initial = {},
  onClose,
  onSubmit,
  students = [],
}) => {
  const [name, setName] = useState(initial.name ?? "");
  const [age, setAge] = useState(initial.age ?? 16);
  const [grade, setGrade] = useState(initial.grade ?? "");

  useEffect(() => {
    setName(initial.name ?? "");
    setAge(initial.age ?? 16);
    setGrade(initial.grade ?? "");
  }, [initial, open]);

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Tên sinh viên không được để trống");
      return;
    }

    if (
      students.some(
        (s) =>
          s.name.toLowerCase() === name.toLowerCase() &&
          (!initial.id || s.id !== initial.id)
      )
    ) {
      setError("Tên sinh viên đã tồn tại");
      return;
    }

    if (!age || age <= 0) {
      setError("Tuổi sinh viên không được nhỏ hơn 0 và không được bỏ trống");
      return;
    }

    if (!grade.trim()) {
      setError("Tên lớp học không được để trống");
      return;
    }

    setError(""); 
    onSubmit({
      id: initial.id,
      name: name.trim(),
      age: Number(age),
      grade: grade.trim(),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initial.id ? "Edit Student" : "Add Student"}</DialogTitle>
        <DialogContent className="flex flex-col gap-[15px] space-y-4 !pt-2">
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 1 }}
          />
          <TextField
            label="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            fullWidth
            placeholder="e.g. 10A1"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initial.id ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentForm;
