import { Route } from "react-router-dom";
import AppLayout from "@/app/layouts/AppLayout.tsx";
import HomePage from "@/app/features/home/HomePage.tsx";
import ChannelsPage from "@/app/features/channels/ChannelsPage.tsx";
import ChannelPage from "@/app/features/channels/ChannelPage.tsx";
import ConversationsPage from "@/app/features/conversations/ConversationsPage.tsx";
import ContactsPage from "@/app/features/contacts/ConversationsPage.tsx";
import SupportPage from "@/app/features/support/SupportPage.tsx";
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
            <Route path="/contact" element={<ContactsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
        </Route>
    </Route>
)
