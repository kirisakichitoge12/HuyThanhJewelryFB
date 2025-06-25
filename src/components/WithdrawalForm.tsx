import { useState } from "react";
import Button from "./common/Button"
import FormField from "./common/FormField";
import SelectForm from "./common/SelectForm";

const WithdrawalForm: React.FC = () => {
    const [amount, setAmount] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [bank, setBank] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [accountHolder, setAccountHolder] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle withdrawal submission
        console.log({
            amount,
            notes,
            bank,
            accountNumber,
            accountHolder
        });
    };
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-medium mb-4">Rút tiền</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số tiền yêu cầu rút *
                    </label>
                    <FormField 
                        value={amount}
                        type='number'
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="0"
                    /> 
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                    />
                </div>

                <SelectForm 
                    title='Ngân hàng'
                    availabData={["Vietcombak", "Techcombak"]}
                    onSelectedChange={(value: string) => setBank(value)}
                    selectedValue={bank}
                /> 

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số tài khoản
                    </label>
                    <FormField
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />  
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chủ tài khoản
                    </label>
                    <FormField 
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                    />
                </div>

                <p className="text-sm text-gray-500">
                    Bằng việc gửi yêu cầu rút tiền, bạn đồng ý với phí dịch vụ và Điều khoản và Điều kiện sử dụng dịch vụ của chúng tôi.
                </p>
                <Button onClick={() => {}} >Gửi yêu cầu rút tiền</Button>
            </form>
        </div>
    )
}

export default WithdrawalForm;