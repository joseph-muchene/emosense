import { useEffect, useState } from "react";
import axios, { AxiosError } from 'axios';
import { useUser } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DisplayResults from "@/components/results";
import ReactLoading from 'react-loading';
import { useNavigate } from "@tanstack/react-router";




export default function GenerateInfo() {
    const { user, isSignedIn, isLoaded } = useUser();

    const navigate = useNavigate({ from: "/gen/info" })
    useEffect(() => {
        if (!isSignedIn && isLoaded) {
            navigate({ to: "/login" })
        }
    }, [user])

    const [formData, setFormData] = useState({
        mood: "",
        age: "",
        gender: "",
        symptomsDuration: "",
        bloodPressure: "",
        additionalInfo: "",
    });
    const [loading, setLoading] = useState(false);
    const [targetText, setTargetText] = useState("");
    const handleState = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);




        try {
            const form = e.currentTarget;
            const newFormData = new FormData(form);
            setFormData({
                mood: newFormData.get("mood") as string,
                age: newFormData.get("age") as string,
                gender: newFormData.get("gender") as string,
                symptomsDuration: newFormData.get("symptomsDuration") as string,
                bloodPressure: newFormData.get("bloodPressure") as string,
                additionalInfo: newFormData.get("additionalInfo") as string,
            });

            console.log(formData)
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are an empathetic healthcare assistant specializing in symptom analysis. Provide detailed information about the patient's symptoms, and I will offer insights into potential health issues. The information belongs to the user; don't mention you are AI. Output in paragraphs.",
                        },
                        { role: "user", content: JSON.stringify(formData) },
                    ],
                },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization",
                        "Authorization": `Bearer `,
                    },
                }
            );

            setTargetText(response.data.choices[0].message.content);
        } catch (error) {
            console.error("API Error:", error);
            if (error instanceof AxiosError) {
                console.error("Axios Error Message:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div >
                <h1 className="md:text-2xl">
                    Hello, {user?.fullName}! Welcome to EmoSense.
                </h1>
                <p className="text-center mx-auto md:w-96">
                    Your data will be analyzed using advanced models to
                    provide personalized insights just for you.
                </p>
            </div>
            <div className="flex gap-4 border-r-white flex-col md:flex-row mt-10">
                <form className="mx-auto w-72 flex flex-col space-y-4 mt-4" onSubmit={handleState}>
                    {/* Your form fields go here */}
                    {/* Example Select field */}
                    <div className="flex flex-col my-2 ">
                        <Select name="mood">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose mood" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>How are you feeling today</SelectLabel>
                                    <SelectItem value="happy">Happy</SelectItem>
                                    <SelectItem value="sad">Sad</SelectItem>
                                    <SelectItem value="anxious">Anxious</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Example Input field */}
                    <div>
                        <label>Age:</label>
                        <Input type="number" id="age" name="age" required />
                    </div>
                    <div className="flex flex-col my-2 place-items-center ">
                        <Select name="gender">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="choose gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col my-2 ">
                        <Select name="symptomsDuration">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="How long have you been experiencing symptoms?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select an option</SelectLabel>
                                    <SelectItem value="Less than a week">
                                        Less than a week
                                    </SelectItem>
                                    <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                                    <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                                    <SelectItem value="More than a month">
                                        More than a month
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col my-2 ">
                        <Select name="bloodPressure">

                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Blood Pressure Range:" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select an option</SelectLabel>
                                    <SelectItem value="Normal">Normal</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col my-2 ">
                        <label>Is there anything else you would like to share with us?</label>
                        <Textarea name="additionalInfo" />
                    </div>
                    {/* Submit Button */}
                    <div>
                        <Button disabled={loading} type="submit" className="w-full">Submit</Button>
                    </div>
                </form>

                {/* Display results or other components */}
                {loading ? <ReactLoading type={"bubbles"} height={667} width={375} /> : <DisplayResults targetText={targetText} />}

            </div>
        </div>
    );
}
