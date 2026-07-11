import ConversationList from "@/app/features/conversations/components/ConversationList.tsx";

const ConversationsPage = () => {
    return (
        <>
            <div className="flex items-center justify-center mt-10">
                <ConversationList></ConversationList>
            </div>
        </>
    )
}

export default ConversationsPage;
