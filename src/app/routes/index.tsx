import { Route } from "react-router-dom";
import AppLayout from "@/app/layouts/AppLayout.tsx";
import HomePage from "@/app/features/home/HomePage.tsx";
import ChannelsPage from "@/app/features/channels/ChannelsPage.tsx";
import ChannelPage from "@/app/features/channels/ChannelPage.tsx";
import ConversationsPage from "@/app/features/conversations/ConversationsPage.tsx";
import ConversationPage from "@/app/features/conversations/ConversationPage.tsx";
import ContactsPage from "@/app/features/contacts/ConversationsPage.tsx";
import AgentPage from "@/app/features/agent/AgentPage.tsx";
import SupportPage from "@/app/features/support/SupportPage.tsx";
import TicketPage from "@/app/features/support/TicketPage.tsx";
import SettingsPage from "@/app/features/settings/SettingsPage.tsx";
import NotFound from "@/shared/components/NotFound.tsx";
import PrivateRoute from "@/shared/routes/PrivateRoute.tsx";


export const AppRoutes = (
    <Route element={<PrivateRoute />}>
        <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/channel" element={<ChannelsPage />} />
            <Route path="/channel/:id" element={<ChannelPage />} />
            <Route path="/conversation" element={<ConversationsPage />} />
            <Route path="/conversation/:id" element={<ConversationPage />} />
            <Route path="/contact" element={<ContactsPage />} />
            <Route path="/agent" element={<AgentPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/support/:id" element={<TicketPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Route>
)
