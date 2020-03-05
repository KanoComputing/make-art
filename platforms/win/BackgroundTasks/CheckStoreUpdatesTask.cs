/**
 * CheckStoreUpdatesTask.cs
 * 
 * This out-of-process background task checks for app updates available on the 
 * Microsoft Store. If a mandatory update is available, a feature flag is set
 * and any background tasks that use KES are unregistered.
 */


using System;
using System.Diagnostics;
using Windows.ApplicationModel.Background;

using KanoComputing.AppUpdate;


namespace MakeArt.BackgroundTasks {
    public sealed class CheckStoreUpdatesTask : IBackgroundTask {

        private BackgroundTaskDeferral Deferral = null;
        
        public async void Run(IBackgroundTaskInstance taskInstance) {
            this.Deferral = taskInstance.GetDeferral();
            taskInstance.Canceled += new BackgroundTaskCanceledEventHandler(OnTaskCancelled);

            try {
                AppUpdater updater = new AppUpdater();
                bool mandatory = await updater.IsMandatoryUpdateAvailableAsync(setFlag: true);

                /**
                 * Unregister non-essential tasks when there is a mandatory update
                 * 
                 * if (mandatory) {
                 *     // Unregister non-essential tasks
                 * }
                 */
                Debug.WriteLine("CheckStoreUpdatesTask: Mandatory updates available: " + mandatory);

            } catch (Exception e) {
                Debug.WriteLine("ERROR: CheckStoreUpdatesTask: Run: " + e.Message);
            } finally {
                this.Deferral.Complete();
            }
        }

        private void OnTaskCancelled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason) {
            if (this.Deferral != null) {
                this.Deferral.Complete();
            }
            Debug.WriteLine("Background " + sender.Task.Name + " Cancel Requested...");
        }
    }
}
