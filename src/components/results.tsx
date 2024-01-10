
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function DisplayResults({ targetText }: { targetText: string }) {

    function formatIntoParagraphs(text: string) {
        // Split the text into paragraphs based on two consecutive line breaks
        const paragraphs = text.split('\n\n');

        // Create HTML paragraphs
        const formattedText = paragraphs.map(paragraph => `<p>${paragraph}</p>`);

        // Join the paragraphs into a single string
        return formattedText.join('');
    }

    return (

        <div>

            {/* <Textarea rows={20} cols={50} /> */}

            <Card className="md:w-[580px] mt-6">
                <CardContent dangerouslySetInnerHTML={{ __html: formatIntoParagraphs(targetText) }}>


                </CardContent>
            </Card>
        </div>
    )
}