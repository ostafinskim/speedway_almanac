import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import { NewRiderForm } from '@/components/rider/new-rider-form';

function NewRiderPage() {
    const queryClient = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NewRiderForm />
        </HydrationBoundary>
    );
}
export default NewRiderPage;
