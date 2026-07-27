import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Briefcase, GraduationCap, Award, Globe } from "lucide-react";
import { CVData } from "@/pages/CVBuilder";

interface ManualDataFormProps {
  cvData: CVData;
  onDataUpdate: (data: Partial<CVData>) => void;
}

const ManualDataForm = ({ cvData, onDataUpdate }: ManualDataFormProps) => {
  const [newSkill, setNewSkill] = useState("");

  const updatePersonalInfo = (field: string, value: string) => {
    onDataUpdate({
      personalInfo: {
        ...cvData.personalInfo,
        [field]: value,
      },
    });
  };

  const addExperience = () => {
    onDataUpdate({
      experience: [
        ...cvData.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updatedExperience = cvData.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onDataUpdate({ experience: updatedExperience });
  };

  const removeExperience = (index: number) => {
    onDataUpdate({
      experience: cvData.experience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    onDataUpdate({
      education: [
        ...cvData.education,
        {
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = cvData.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onDataUpdate({ education: updatedEducation });
  };

  const removeEducation = (index: number) => {
    onDataUpdate({
      education: cvData.education.filter((_, i) => i !== index),
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !cvData.skills.includes(newSkill.trim())) {
      onDataUpdate({
        skills: [...cvData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    onDataUpdate({
      skills: cvData.skills.filter(s => s !== skill),
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-primary" />
            </div>
            المعلومات الشخصية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">الاسم الكامل</Label>
              <Input
                id="fullName"
                value={cvData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="+1234567890"
              />
            </div>
            <div>
              <Label htmlFor="location">المدينة</Label>
              <Input
                id="location"
                value={cvData.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                placeholder="المدينة، الدولة"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="summary">نبذة مختصرة</Label>
            <Textarea
              id="summary"
              value={cvData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              placeholder="اكتب نبذة مختصرة عن خبراتك ومهاراتك..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              الخبرات العملية
            </CardTitle>
            <Button onClick={addExperience} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة خبرة
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {cvData.experience.map((exp, index) => (
            <Card key={index} className="border-l-4 border-l-primary/30">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">خبرة عملية #{index + 1}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeExperience(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>اسم الشركة</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="اسم الشركة"
                    />
                  </div>
                  <div>
                    <Label>المنصب</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      placeholder="المنصب الوظيفي"
                    />
                  </div>
                  <div>
                    <Label>تاريخ البداية</Label>
                    <Input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>تاريخ النهاية</Label>
                    <Input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label>وصف المهام</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="اكتب وصفاً مفصلاً لمهامك وإنجازاتك..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
              التعليم
            </CardTitle>
            <Button onClick={addEducation} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة مؤهل
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {cvData.education.map((edu, index) => (
            <Card key={index} className="border-l-4 border-l-success/30">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">مؤهل تعليمي #{index + 1}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeEducation(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>اسم المؤسسة</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      placeholder="اسم الجامعة أو المعهد"
                    />
                  </div>
                  <div>
                    <Label>الدرجة العلمية</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="بكالوريوس، ماجستير، دكتوراه..."
                    />
                  </div>
                  <div>
                    <Label>التخصص</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(index, "field", e.target.value)}
                      placeholder="التخصص الدراسي"
                    />
                  </div>
                  <div>
                    <Label>التقدير</Label>
                    <Input
                      value={edu.grade || ""}
                      onChange={(e) => updateEducation(index, "grade", e.target.value)}
                      placeholder="ممتاز، جيد جداً، GPA..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            المهارات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="أضف مهارة جديدة..."
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              إضافة
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-1"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-muted-foreground hover:text-destructive ml-1"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualDataForm;